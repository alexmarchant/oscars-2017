/**
 * Creates an ad view based on configuration passed into the constructor
 *
 * <p><b>Require Path:</b> shared/views/adlibrary/dfp</p>
 *
 * @module Shared
 * @submodule Shared.Ads
 * @namespace AdLibrary
 * @class View
 * @constructor
 * @extends foundation/views/base-view
**/
define([
    'jquery/nyt',
    'underscore/nyt',
    'shared/adlibrary/views/base-ad',
    'foundation/hosts',
    'shared/adlibrary/helpers/dfp-ordered-custom-criteria-mixin',
    'shared/adlibrary/helpers/dfp-placements-mixin',
    'shared/adlibrary/helpers/dfp-sitewide-requirements-mixin'
], function ($, _, BaseAdView, hosts, orderedCustomCriteria, defaultPlacements, sitewideRequirements) {
    'use strict';

    var DfpView = BaseAdView.extend({

        alreadyRequested: {}, // Ads that have been requested

        notYetRequested: {}, // Ads that have not yet been requested

        readyForDisplay: {}, // Ads whose slots are defined and not yet rendered

        adPath: '',  // Sample: /0000000/zznyt/section/subsection

        viewName: 'dfp', // Needed for identifying which events belong to which view

        chamber: [],  // Array containing the ad positions about to be requested

        adsOnPage: {},

        $adsOnPage: {},

        slots: {},  // Every slot defined eventually ends up here

        googletag: null, // Placeholder for Google DFP object

        customCriteria: [],  // Key value pairs for setTargeting custom criteria

        placements: defaultPlacements,  // Default ad placements for all DFP views

        isScanning: false,  // Is the library checking the viewport for placements?

        hasTragedy: false, // if true dont request any ads

        piiDetected: false, // if found dont request ads

        /**
         * Find ads on the page, queue them, and request them if they are in
         * the viewport.
         *
         * @public
         * @method initialize
         * @param {Object} options  A set of options, passed in during instantiation
         *                    behaviors:  (Optional) Application specific behaviors
         *                    placements: (Optional) Hash of placements to request
        **/
        initialize: function (options) {
            // Infosys-1255
            // Check for PII
            /* eslint-disable vars-on-top */
            if (this.pageManager.flag('piiBlockDFP')) {
                var referrer = document.referrer || '';
                var url = window.location.href;
                var emailMatch = /([a-zA-Z0-9_\-\.]+)(@|%40)([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/;

                if (emailMatch.test(url) || emailMatch.test(referrer)) {
                    this.piiDetected = true;
                }
            }

            options = options || {};

            // Listen to ready event before requesting ads.  Application requirements *must* trigger this.
            this.listenToAdEvent('ready', this.handleReady);

            // This is the taxonomy used for every ad request
            // Format /000000/zznyt/section/subsection
            this.adPath = this.getAdUnitPath();

            // Set the sitewide requirements for all applications using DFP
            this.sitewide = sitewideRequirements;

            // Set the default custom criteria
            this.customCriteria = _.each(orderedCustomCriteria, function (criterium) {
                return _.clone(criterium);
            });
            // Set any overrides to custom criteria
            this.setCustomCriteria(options.customCriteria);

            // Find which placements' containers are on the page
            this.discoverAdsOnPage();
            // Places all placements that are on the page in the chamber, in a single request
            this.addToChamber(this.adsOnPage);
            // Listen for every ad requested and keep track of them
            this.listenToAdEvent('ad-slot-defined', this.handleSlotDefined);
            // Listen if an ad was rendered and call a tracking method.  'true' indicates listen to once
            this.listenToAdEvent('ad-rendered', this.triggerTagX, true);
            // Listen to requests for ad placements by other NYT5 modules
            this.listenToAdEvent('request-placement', this.requestDynamicAd);
            // Listen to queue requests for ad placements by other NYT5 modules
            this.listenToAdEvent('queue-placement', this.queueDynamicAd);
            // Scan the viewport for ad placements
            this.listenToAdEvent('scan', this.scan);
            this.listenToAdEvent('discover', this.discoverAdsOnPage);
            // Notify watchers that this view is waiting for ready
            this.broadcastAdEvent('waiting', this);
        },

        /**
         * Returns the ad unit path required to run dfp
         * This is the taxonomy used for every ad request
         * FORMAT: /000000/zznyt/[section]/[subsection]
         *
         * @public
         * @method getAdUnitPath
        **/
        getAdUnitPath: function () {
            var section, subsection;
            var sensitivity = this.getAdSensitivity();
            var path = this.pageManager.getMeta('dfp-ad-unit-path');

            // If no meta tag exists, construct one from CG and SCG tags
            // This is only a failsafe!  Do not let people leave off the meta tag
            if (_.isUndefined(path)) {
                section = this.pageManager.getMeta('CG');
                subsection = (this.pageManager.getMeta('SCG')) ? '/' + this.pageManager.getMeta('SCG') : '';
                path = section + subsection;
            }

            return hosts.dfpHost + path;
        },

        /**
         * Run all the functions related to loading DFP ads.
         *
         * @public
         * @method handleReady
        **/
        handleReady: function () {
            var dfp = this;

            // Store window.googletag on the view
            this.googletag = window.googletag;

            // Poll until the dfp view is ready
            if (!this.googletag) {
                return setTimeout(function () {
                    dfp.handleReady();
                }, 500);
            }

            // This is a common mistake developers make.  Let them know.
            if (this.isReady) {
                throw new Error('DFP already in ready state.  Do not signal ready more than once.');
            }

            // Set the ready flag so other components can request ads on the fly
            this.isReady = true;

            this.addPageLevelParameters();  // Set page-level targeting applied to every ad placement
            this.initialAdRequest(); // Calls defineSlot for every item in the chamber
            this.enableServices(); // Prepare googletag for requests
            this.scan();  // Scan the viewport for placements
            this.listenToAdEvent('placement-added', this.scan);  // Scan the viewport for each new placement

        },

        /**
         * Track and set targeting on ads once their slot
         * has been defined
         *
         * @public
         * @method handleSlotDefined
        **/
        handleSlotDefined: function (slot, name) {
            this.trackRequested(slot, name);
        },

        /**
         * Find the ad element containers  that are in the viewport and
         * request them
         *
         * @public
         * @method requestAdsInViewport
        **/
        requestAdsInViewport: function () {
            this.requestMultipleAds(this.getAdsInViewport());
        },

        /**
         * Tracks all ads that have been requested.  Stops listening when all ads
         * have been requested.
         *
         * @public
         * @method trackRequested
         * @param {String} name The id of the ad element that was requested
        **/
        trackRequested: function (slot, name) {
            this.readyForDisplay[name] = this.notYetRequested[name];

            delete this.notYetRequested[name];

            if (_.keys(this.notYetRequested).length === 0) {
                this.isScanning = false;
                this.stopSubscribing('nyt:page-scroll', this.requestAdsInViewport);
            }
        },

        /**
         * Find all the ad element containers that are in the viewport
         *
         * @public
         * @method getAdsInViewport
         * @return {Object} Hash of ads that are in view.
        **/
        getAdsInViewport: function () {
            var view = this;
            var adsInViewport = {};

            _.each(this.$adsOnPage, function ($ad, name) {
                if (!view.alreadyRequested[name] && view.isElementInViewport($ad)) {
                    adsInViewport[name] = {
                        $el: $ad,
                        size: view.adsOnPage[name]
                    };
                }
            });

            return adsInViewport;
        },

        /**
         * Enable the googletag service and listen for request events
         *
         * @public
         * @method enableServices
        **/
        enableServices: function () {
            var googletag = this.googletag;
            var view = this;

            googletag.cmd.push(function () {

                if (googletag.pubads().addEventListener) {
                    googletag.pubads().addEventListener('slotRenderEnded', function (event) {
                        view.broadcastAdEvent('ad-rendered', event.slot.getSlotId().getDomId(), event.size, event.isEmpty, event.lineItemId, event.serviceName);
                    });
                }

                view.broadcastAdEvent('enable-services');

                // NOTE: Single request is enabled for DFP.
                // Please grep this file for a note regarding
                // the effect of Single Request Architecture
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();

            });
        },

        /**
         * Using googletag, call setTargeting for each of the custom criteria
         *
         * @public
         * @method addPageLevelParameters
        **/
        addPageLevelParameters: function () {
            var googletag = this.googletag;

            _.each(this.customCriteria, function (criterium) {
                if (!_.isEmpty(criterium.value)) {
                    googletag.cmd.push(function () {
                        googletag.pubads().setTargeting(criterium.key, criterium.value);
                    });
                }
            });
        },

        /**
         * Set the value of a custom criterium or multiple criteria
         *
         * @public
         * @method setCustomCriteria
         * @param {Object} criteria Object or array of objects containing the properties key and value
        **/
        setCustomCriteria: function (criteria) {
            if (!_.isObject(criteria)) {
                return;
            }

            _.each(criteria, function (value, key) {
                var found = _.findWhere(this.customCriteria, {key: key});

                if (!value) {
                    return;
                }

                // google tag setTargeting only accepts string or array as value
                if (!_.isString(value) && !_.isArray(value)) {
                    value = value.toString();
                }

                // If the criterium exists, set the value
                if (found) {
                    found.value = value;
                // If it doesn't exist, add it to the end of the array
                } else {
                    this.customCriteria.push({
                        key: key,
                        value: value
                    });
                }

            }, this);
        },

        /**
         * Define the ad slots needed for the page.  Attach event listeners.
         *
         * @public
         * @method defineAdSlots
         * @param {Object} ads Hash of ads that will be queued
        **/
        defineAdSlots: function (ads) {
            var dfp = this;
            var isInitial = (ads.isInitial);
            var googletag = dfp.googletag;

            // Filter out slots we already have requested
            ads = _.omit(ads, _.keys(dfp.slots));

            // Jump out if filter emptied out the ads
            if (_.isEmpty(ads)) {
                return;
            }

            googletag.cmd.push(function () {
                _.each(ads, function (size, name) {
                    var slotSize, mapping, slot;

                    if (!_.isArray(size)) {
                        return;
                    }

                    // check if we have a responsive mapping based on array depth
                    if (size === 'fluid' || (_.isArray(size) && size.indexOf('fluid') > -1)) {
                        slotSize = size;
                    } else if (!_.isArray(size) || !_.isArray(size[0]) || !_.isArray(size[0][0])) {
                        slotSize = size; // no responsive map, just define slot size, nothing else
                    } else {
                        // instead of providing a default size for the slot, only allow using responsive maps
                        slotSize = [];
                        mapping = size;
                    }

                    slot = googletag.defineSlot(dfp.adPath, slotSize, name);

                    if (mapping) {
                        slot.defineSizeMapping(mapping);
                    }

                    slot.addService(googletag.pubads())
                        .setCollapseEmptyDiv(true);

                    // Add the slot object  # See below
                    dfp.slots[name] = slot;
                    // Denote whether this was defined in the initial ad call or lazy loaded
                    dfp.$adsOnPage[name].data('isInitial', isInitial);
                    // Tell listeners a slot was defined
                    dfp.broadcastAdEvent('ad-slot-defined', slot, name, size);
                });
            });
        },

        /**
         * Given a hash of ads, request to display each one.
         *
         * @public
         * @method requestMultipleAds
         * @param {Object} ads Hash of ads that will be requested
        **/
        requestMultipleAds: function (ads) {
            _.each(ads, function (ad, name) {
                if (typeof this.slots[name] === 'undefined') {
                    this.requestDynamicAd(name, ad.size);
                } else {
                    this.requestSingleAd(name);
                }
            }, this);
        },

        /**
         * Given an id of the placement name, request to display the ad
         *
         * @public
         * @method requestSingleAd
         * @param {String} name The id of the ad placement
        **/
        requestSingleAd: function (name) {
            var googletag = this.googletag;
            var dfp = this;

            // Infosys-1255
            // If PII found stop requests
            if (dfp.piiDetected) {
                return;
            }

            // Only request ads if we have not requested the tragedy ad
            if (!this.hasTragedy) {
                // Always roadblock any requests until ready
                if (!dfp.isReady) {
                    return dfp.listenToAdEvent('ready', function () {
                        dfp.requestSingleAd(name);
                    }, true);
                }

                googletag.cmd.push(function () {
                    googletag.display(name);

                    /**
                     * NOTE ABOUT SINGLE REQUEST ARCHITECTURE
                     * With single request enabled, calling display on ONE placement
                     * implicitly calls googletag.display for all placements that
                     * have had their slots defined.  Therefore, if we call display for one placement
                     * extend alreadyRequested with everything waiting to be displayed.
                     * JIRA: https://jira.nyt.net/browse/WP-9039
                    **/
                    _.extend(dfp.alreadyRequested, dfp.readyForDisplay);

                    delete dfp.readyForDisplay[name];
                });
            }
        },

        /**
         * Determine via jQuery which ads exist on the page.  Sets
         * the properties adsOnPage and $adsOnPage on the view.
         * NOTE:  This method exists because it costs money to request
         *        placements that are not on the page, so only request
         *        placements that are actually on the page.
         *
         * @public
         * @method discoverAdsOnPage
        **/
        discoverAdsOnPage: function () {
            var dfp = this;
            var $ads = $('.ad, .text-ad, .sponsor-ad');

            $ads.each(function (index, ad) {
                if (ad.id in dfp.placements && !dfp.$adsOnPage[ad.id]) {
                    dfp.addPlacement(ad.id);
                }
            });
        },

        /**
         * Add placements to the request chamber
         *
         * @public
         * @method addToChamber
        **/
        addToChamber: function () {
            this.chamber.push.apply(this.chamber, _.toArray(arguments));
        },

        /**
         * Clear the request chamber, and return what was deleted
         *
         * @public
         * @method clearChamber
        **/
        clearChamber: function () {
            var cleared = this.chamber;

            this.chamber = [];

            return cleared;
        },

        /**
         * Loop through the chamber and call define slots for every
         * item in the array.  This is the first ad request of the page.
         *
         * @public
         * @method initialAdRequest
        **/
        initialAdRequest: function () {
            _.each(this.chamber, function (item) {
                // Indicate that this ad was not lazy loaded
                item.isInitial = true;
                // Define the slot!
                this.defineAdSlots(item);
            }, this);
        },

        /**
         * Renders an ad placement ad hoc.  Any NYT5 module can trigger the event
         * 'request-placement' and this method will take the necessary steps to
         * render that placement.
         *
         * @public
         * @method requestDynamicAd
         * @param {String} name The name of the placement to render
        **/
        requestDynamicAd: function (name, size) {
            var dfp = this;

            // Always roadblock any requests until ready
            if (!dfp.isReady) {
                return dfp.listenToAdEvent('ready', function () {
                    dfp.requestDynamicAd(name, size);
                }, true);
            }

            // If we already defined this slot
            if (this.alreadyRequested[name]) {
                // Re-acquire the element from the DOM
                this.$adsOnPage[name] = $('#' + name);
                // Jump out.  Previously when we were refreshing slots here, it caused duplicate requests.
                return false;
            }

            // Add it to the list of placements everywhere
            this.addPlacement(name, size);
            // Define the ad slot using the DFP API
            this.defineAdSlots(this.getPlacement(name));
            // Request to display the placement
            this.requestSingleAd(name);
        },

        /**
         * Similar to requestDynamicAd, but doesn't immediately define the slot and display it.
         * This method merely adds a placement and notifies the library to continue scanning
         * for new ad placements that come into the viewport.
         *
         * @public
         * @method queueDynamicAd
         * @param {String} name The name of the placement to queue
        **/
        queueDynamicAd: function (name, size) {
            // Add the placement.  Chances are if you called queueDynamicAd, you called it from
            // a module that renders after ads are initially scanned.
            this.addPlacement(name, size);
            // Re-enable scanning if it's disabled
            this.scan();
        },

        /**
         * Returns a jQuery element of the placement on the page
         *
         * @public
         * @method getAdElement
         * @param {String} name The name of the placement to remove
         * @return {Object} The jQuery element of the placement
        **/
        getAdElement: function (name) {
            return this.$adsOnPage[name] || $();
        },

        /**
         * Returns true or false based off if a placement has a size
         *
         * @public
         * @method hasPlacementSize
         * @param {String} name The name of the placement to remove
         * @return {Array} size The size of the placement
        **/
        hasPlacementSize: function (name, size) {
            var placement = this.placements[name];
            var i;

            if (placement) {

                for (i = 0; i < placement.length; i++) {
                    // it's an array, do this test since fluid
                    // is a possible placement and it's a string
                    if (typeof placement[i] !== 'string') {

                        if (placement[i][0] === size[0] && placement[i][1] === size[1]) {
                            return true;
                        }

                    }

                }

            }
            return false;
        },


        /**
         * Adds an ad placement to all the necessary places needed for it to be
         * requested and rendered
         *
         * @public
         * @method addPlacement
         * @param {String} name The name of the placement to render
         * @param {Array} size The size of the placement
        **/
        addPlacement: function (name, size) {
            var $container;

            // Allow INT developers to pass in hash to add multiple
            if (_.isObject(name)) {
                return _.each(name, function (sz, nm) {
                    this.addPlacement(nm, sz);
                }, this);
            }

            $container = $('#' + name);

            // If the ad container doesn't exist, there's no point
            if ($container.length === 0) {
                return false;
            }

            // Add this placement to the adsOnPage collections since DFP
            // only requests placements that are on the page
            this.placements[name] = size || this.placements[name];
            this.adsOnPage[name] = this.placements[name];
            this.$adsOnPage[name] = $('#' + name);

            // Add the placement to the notYetRequested object since DFP
            // only requests placements that have not been requested yet
            this.notYetRequested[name] = this.$adsOnPage[name];

            this.broadcastAdEvent('placement-added', name, size);
        },

        registerBatchRequest: function (ads) {
            this.registerPlacementsInLibrary(ads);
            this.defineAdSlots(ads);
        },

        registerPlacementsInLibrary: function (ads) {
            var $container;

            _.each(ads, function (size, name) {
                $container = $('#' + name);

                // If the ad container doesn't exist, there's no point
                if ($container.length === 0) {
                    return false;
                }

                // Add this placement to the adsOnPage collections since DFP
                // only requests placements that are on the page
                this.placements[name] = size || this.placements[name];
                this.adsOnPage[name] = this.placements[name];
                this.$adsOnPage[name] = $('#' + name);

                // Add the placement to the notYetRequested object since DFP
                // only requests placements that have not been requested yet
                this.notYetRequested[name] = this.$adsOnPage[name];
            }, this);
        },

        triggerSRARequest: function () {
            if (this.notYetRequested.length == 0) {
                return;
            }

            this.requestSingleAd(Object.keys(this.notYetRequested)[0]);
        },

        /**
         * Remove a placement from the library.
         *
         * @public
         * @method getPlacement
         * @return {Object} An object containing key-value pairs of placements
        **/
        getPlacement: function () {
            var placements = {};

            _.each(_.toArray(arguments), function (name) {
                if (this.adsOnPage[name]) {
                    placements[name] = this.adsOnPage[name];
                }
            }, this);

            return placements;
        },

        /**
         * Check whether the placment for a particular position is a responsive map
         *
         * @public
         * @method hasResponsiveSizePlacement
         * @param {String} name: The name of the placement to check
        **/
        hasResponsiveSizePlacement: function (name) {
            var placement = this.placements[name];

            if (_.isUndefined(placement)) {
                return false;
            }

            if (!_.isArray(placement) || !_.isArray(placement[0]) || !_.isArray(placement[0][0])) {
                return false;
            }

            return true;
        },

        /**
         * Remove a placement from the request.
         *
         * @public
         * @method removePlacement
         * @param {String} name: The name of the placement to remove
        **/
        removePlacement: function (name) {
            delete this.placements[name];
            delete this.adsOnPage[name];
            delete this.$adsOnPage[name];
            delete this.notYetRequested[name];
        },

        /**
         * Remove delete all ad placements
         *
         * @public
         * @method deleteAllPlacements
        **/
        deleteAllPlacements: function () {
            this.placements = {};
            this.adsOnPage = {};
            this.$adsOnPage = {};
            this.notYetRequested = {};
        },

        /**
         * Remove a placement size from the library.
         *
         * @public
         * @method removePlacementSize
         * @param {String} name The name of the affected placement
         * @param {Array} size The size of the placement needed to be removed
        **/
        removePlacementSize: function (name, size) {
            var placementArray, sizeArray, i;

            if (this.adsOnPage && this.adsOnPage[name]) {
                placementArray = this.adsOnPage[name];
            }

            // If the placement has more than one size
            if (this.adsOnPage && this.adsOnPage[name] && _.isArray(this.adsOnPage[name][0])) {

                for (i = 0; i < placementArray.length; i += 1) {

                    sizeArray = placementArray[i];

                    if (sizeArray[0] === size[0] && sizeArray[1] === size[1]) {
                        placementArray.splice(i, 1);
                    }
                }
            // if the placement has only one size and it's equal to the size needed to be removed
            } else if (placementArray && placementArray[0] === size[0] && placementArray[1] === size[1]) {
                this.removePlacement(name);
            }
        },

        /**
         * Edit the size of a placement.  This method completely replaces any sizes
         * already set in the placement
         *
         * @public
         * @method editPlacementSize
         * @param {String} name The name of the placement to edit
         * @param {Array} size The new size(s) of the placement which will replace the old value
        **/
        editPlacementSize: function (name, size) {
            if (this.adsOnPage && this.adsOnPage[name]) {
                /**
                 * Empty the array, don't reassign it.  Other methods use
                 * adsOnPage; reassignment breaks the reference chain.
                 * http://stackoverflow.com/questions/1232040/how-to-empty-an-array-in-javascript
                **/
                this.adsOnPage[name].length = 0;
                // allow for size to be an array of sizes or a single size
                this.adsOnPage[name].push.apply(this.adsOnPage[name], size);
            }
        },

        /**
         * Adds a new size to th placement.
         * TODO:  This looks like it's doing too much.  Can we make this simpler?
         *
         * @public
         * @method addPlacementSize
         * @param {String} name The name of the placement to edit
         * @param {Array} size The size of the placement needed to be removed
        **/
        addPlacementSize: function (name, size) {
            var width;
            var height;
            var isFound = false;
            var i = 0;

            if (_.isUndefined(this.adsOnPage[name])) {
                return this.addPlacement(name, size);
            }

            if (_.isArray(this.adsOnPage[name][0])) {

                for (i; i < this.adsOnPage[name].length; i += 1) {
                    width = this.adsOnPage[name][i][0];
                    height = this.adsOnPage[name][i][1];

                    if (width === size[0] && height === size[1]) {
                        isFound = true;
                        break;
                    }
                }

                if (!isFound) {
                    this.adsOnPage[name].push(size);
                }

            } else {
                width = this.adsOnPage[name][0];
                height = this.adsOnPage[name][1];

                if (width !== size[0] || height !== size[1]) {
                    this.adsOnPage[name].length = 0; // empty array
                    this.adsOnPage[name].push([width, height]); // reput the first placement first
                    this.adsOnPage[name].push(size); // add other placements
                }
            }
        },

        /**
         * DO NOT CALL THIS METHOD DIRECTLY - TRIGGER 'REFRESH' EVENT INSTEAD
         *
         * Refreshes a defined ad slot or an array of slots.  If no placements are specified
         * this will refresh all defined slots, essentially making new requests for every ad
         * on the page.
         *
         * @private
         * @method refreshSlots
         * @param {Array|String} placements An array of placements or the name of one to refresh
        **/
        refreshSlots: function (placements, changeCorrelator) {
            var slots;
            var view = this;

            changeCorrelator = changeCorrelator || false;

            if (placements) {
                slots = [];
                placements = (!_.isArray(placements)) ? [placements] : placements;

                _.each(placements, function (name) {
                    if (this.slots[name]) {
                        slots.push(this.slots[name]);
                    }
                }, this);
            }

            // update this.$adsOnPage in case DOM has changed
            _.each(this.$adsOnPage, function (value, key) {
                view.$adsOnPage[key] = $('#' + key);
            });

            this.googletag.cmd.push(function () {
                view.googletag.pubads().refresh(slots, { changeCorrelator: changeCorrelator });
            });
        },

        /**
         * Returns true or false depending on whether or not the given ad
         * has a slug displaying 'ADVERTISEMENT' or not
         *
         * @public
         * @method hasAdSlug
        **/
        hasAdSlug: function ($ad) {
            return $ad.find('.ad-header').length > 0;
        },

        /**
         * Re-enables the page-scroll event to search for ads as they come into the viewport.
         * Use this if your ad container gets put on the page post DOM ready.
         *
         * @public
         * @method scan
        **/
        scan: function () {
            // Ensure that we're not doing multiple binds at once.  It'll choke the browser.
            if (!this.isScanning) {
                this.isScanning = true;
                this.requestAdsInViewport();
                this.subscribe('nyt:page-scroll', this.requestAdsInViewport);
            }
        }

    });

    return DfpView;
});
