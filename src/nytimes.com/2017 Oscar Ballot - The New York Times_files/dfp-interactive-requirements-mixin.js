/**
 * Blog-specific requirements for DFP Ads
 *
 * <p><b>Require Path:</b> interactive/views/adlibrary/requirements/dfp-interactive-requirements-mixin.js</p>
 *
 * @module Interactive
 * @submodule Interactive.AdLibrary
 * @namespace AdLibrary
 * @class Mixin
**/

define(['jquery/nyt',
        'underscore/nyt'
], function ($, _) {
    'use strict';

    var dfpInteractiveRequirements = {

        view: null,  // Holds a reference to the DFP ads view

        /**
         * Mandatory property of behavior objects.  Define here which events to listen to.
         * or which instructions to execute before ads are fetched and rendered
         *
         * @public
         * @method initialize
         * @param {Object} dfp The view which will implement these requirements
        **/
        initialize: function (dfp) {
            var requirements = this;
            // Store a reference to the DFP View on this object
            this.dfp = dfp;

            dfp.listenToAdEvent('ad-rendered', requirements.handleAdRendered, requirements);
            dfp.listenToAdEvent('ad-slot-defined', requirements.handleAdSlotDefined, requirements);

            this.setInteractiveCustomCriteria();
            this.setMobileAds();
        },

        /**
         * Define the custom criteria specific to the interactive applicaion
         *
         * @private
         * @method setInteractiveCustomCriteria
        **/
        setInteractiveCustomCriteria: function () {
            var criteria = {
                'typ': 'int',
                'coll': []
             };

            var $dataElement = $('#page-config-data');
            var pageConfig = $dataElement.length > 0 ? JSON.parse($dataElement.html()).pageconfig : {};
            var interactiveCollections = pageConfig.collections;

            _.each(interactiveCollections, function (collectionType) {
                _.each(collectionType, function (collection) {
                    collection = collection.replace(/-/g,'').toLowerCase();
                    criteria.coll.push(collection);
                });
            });

            this.dfp.setCustomCriteria(criteria);
        },

        /**
         * The main callback when we define an ad.  We pivot off of the name of the
         * placement and call the proper handler for it
         *
         * @public
         * @method handleAdSlotDefined
         * @param {String} name The ID of the placement that rendered
        **/
        handleAdSlotDefined: function (slot, name) {
            
            switch (name) {
                case 'Middle1C':
                    slot.setTargeting('pos', 'ssearch');
                break;
                case 'Spon2':
                    slot.setTargeting('pos', 'arttools');
                break;
                case 'TopAd':
                    slot.setTargeting('pos', 'top');
                break;
                case 'TopAd1':
                case 'FlexAd':
                    slot.setTargeting('pos', 'mid1');
                break;
                case 'TopAd2':
                    slot.setTargeting('pos', 'mid2');
                break;
                case 'TopAd3':
                    slot.setTargeting('pos', 'mid3');
                break;
                case 'TopAd4':
                    slot.setTargeting('pos', 'mid4');
                break;
                case 'TopAd5':
                    slot.setTargeting('pos', 'mid5');
                break;
                case 'MiddleRight1':
                    slot.setTargeting('pos', 'mid');
                break;
                case 'MiddleRight2':
                    slot.setTargeting('pos', 'ccol1');
                break;
                case 'MiddleRight3':
                    slot.setTargeting('pos', 'ccol2');
                break;
                case 'MiddleRight4':
                    slot.setTargeting('pos', 'ccol3');
                break;
                case 'MiddleRight5':
                    slot.setTargeting('pos', 'ccol4');
                break;
                case 'MiddleRight6':
                    slot.setTargeting('pos', 'ccol5');
                break;
                case 'MiddleRight7':
                    slot.setTargeting('pos', 'ccol6');
                break;
                case 'MiddleRight8':
                    slot.setTargeting('pos', 'ccol7');
                break;
                case 'MiddleRight9':
                    slot.setTargeting('pos', 'ccol8');
                break;
                case 'MiddleRight10':
                    slot.setTargeting('pos', 'ccol9');
                break;
                case 'MiddleRight11':
                    slot.setTargeting('pos', 'ccol10');
                break;
                case 'MiddleRight12':
                    slot.setTargeting('pos', 'ccol11');
                break;
                case 'MiddleRight13':
                    slot.setTargeting('pos', 'ccol12');
                break;
                case 'MiddleRight14':
                    slot.setTargeting('pos', 'ccol13');
                break;
                case 'MiddleRight15':
                    slot.setTargeting('pos', 'ccol14');
                break;
                case 'BottomAd':
                    slot.setTargeting('pos', 'bottom');
                break;
            }

        },

        /**
         * The main callback for when an ad is rendered onto the page.
         *
         * @public
         * @method handleAdRendered
         * @param {String} name The ID of the placement that rendered
         * @param {Array} size An array of the width and height of an ad
         * @param {Bool} isEmpty Is the ad slot empty
        **/
        handleAdRendered: function (name, size) {
            var requirements = this;
            var dfp = requirements.dfp;
            var $ad = dfp.getAdElement(name);

            switch (name) {
                case 'TopAd1':
                    requirements.handleTopAd1($ad, size);
                    break;
                default:
                    return
            }
        },
        /**
         * Handler function for TopAd1
         *
         * @public
         * @method handleTopAd1
         * @param {Object} A jQuery object
         * @param {Array} Array of ad dimensions
        **/
        handleTopAd1: function ($ad, size) {
            if (this.isFlexFrame(size)) {
                this.dfp.$html.addClass('has-flex-ad');
                $ad.addClass('flex-ad');
            }
        },
        /**
         * Checks if ad is a flex frame based on size.
         *
         * @public
         * @method isFlexFrame
         * @param {Array} Array of ad dimensions
        **/
        isFlexFrame: function (size) {
            return ((size[0] === 414 && size[1] === 457) || (size[0] === 1605 || size[0] === 0));
        },

        /**
         * Handles ad slots programtically when in a mobile viewport
         *
         * @public
         * @method setMobileAds
        **/
        setMobileAds: function () {
            var viewport = this.dfp.pageManager.getViewport().width;

            // If viewport is mobile
            if (viewport < 768) {

                // No ads in the TopAd on mobile
                this.dfp.editPlacementSize('TopAd', []);
                // if the interactive is a listy
                if (this.dfp.$body.hasClass('list-style-feature')) {
                    this.dfp.editPlacementSize('TopAd1', [[414, 457], [300, 250]]);
                    this.dfp.editPlacementSize('TopAd2', [300, 250]);
                    this.dfp.editPlacementSize('TopAd3', [300, 250]);
                    this.dfp.editPlacementSize('TopAd4', [300, 250]);
                    this.dfp.editPlacementSize('TopAd5', [300, 250]);
                }
            }

        }
    };

    return dfpInteractiveRequirements;
});
