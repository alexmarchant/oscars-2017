define([
    'foundation/views/page-manager',
    'shared/adlibrary/views/dfp',
    'interactive/views/adlibrary/placements/dfp-placements-mixin',
    'shared/adlibrary/views/adx',
    'interactive/views/adlibrary/placements/adx-placements-mixin',
    'interactive/views/adlibrary/requirements/dfp-interactive-requirements-mixin'
], function (pageManager, Dfp, dfpPlacements, Adx, adxPlacements, dfpInteractiveRequirements) {
    'use strict';
    var dfp;
    // don't use any ad library if this is a hybrid embedded
    if (pageManager.getMeta('isHybrid') === 'true') {
        return null;
    }

    new Adx({
        placements: adxPlacements
    });
    dfp = new Dfp({
        placements: dfpPlacements,
        requirements: dfpInteractiveRequirements
    });

    return dfp;
});
