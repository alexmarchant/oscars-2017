/**
 * An object that defines placement names and sizes for DFP ads in the blogs app
 *
 * <p><b>Require Path:</b> interactive/views/adlibrary/dfp-placements-mixin</p>
 *
 * @module Interactive
 * @submodule Interactive.AdLibrary
 * @namespace AdLibrary
 * @class Mixin
 **/
define([], function () {
    'use strict';

    var dfpPlacementsMixin = {
        'TopAd': ['fluid', [728, 90], [970, 90], [970, 66], [970, 250], [1605, 300]],
        'TopAd1': ['fluid', [1605, 300], [300, 250], [728, 90]],
        'TopAd2': [[300, 250], [728, 90]],
        'TopAd3': [[300, 250], [728, 90]],
        'TopAd4': [[300, 250], [728, 90]],
        'TopAd5': [[300, 250], [728, 90]],
        'lede-ad': [[468, 648], [300, 600], [300, 250]],
        'marketing-ad': [301, 250],
        'MiddleRight1': [300, 250],
        'MiddleRight2': [300, 250],
        'MiddleRight3': [300, 250],
        'MiddleRight4': [300, 250],
        'MiddleRight5': [300, 250],
        'MiddleRight6': [300, 250],
        'MiddleRight7': [300, 250],
        'MiddleRight8': [300, 250],
        'MiddleRight9': [300, 250],
        'MiddleRight10': [300, 250],
        'MiddleRight11': [300, 250],
        'MiddleRight12': [300, 250],
        'MiddleRight13': [300, 250],
        'MiddleRight14': [300, 250],
        'MiddleRight15': [300, 250],
        'Middle1C': [88, 31],
        'MostEm': [88, 31],
        'TopNavAd': [88, 31],
        'Moses': [[970, 418], [970, 40]],
        'Frame4A': [96, 60],
        'Frame6A': [336, 90],
        'Position1': [96, 60],
        'Spon2': [88, 31],
        'MiddleRightN': [300, 250],
        'TopAdN': [728, 90],
        'BigAd3': [300, 250],
        'MobileBanner': [320, 50],
        'MobileBanner2': [[320, 50], [300, 250]],
        'Ribbon': [240, 75],
        'RibbonInterstitial': [900, 500],
        'Interstitial': [[1, 1], [640, 480]],
        'WelcomeBack': [300, 250],
        'sponsortile': [150, 50],
        'BottomAd': [728, 90]
    };

    return dfpPlacementsMixin;
});
