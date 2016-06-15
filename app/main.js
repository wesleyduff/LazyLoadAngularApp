/**
 * app entry point. loads al the main files nedded for
 * the application to start and bootstrap the application main module
 */

require.config({
    baseUrl : '',
    paths: {
        'angular': 'components/angular/angular',
        'ui.router': 'components/angular-ui-router/release/angular-ui-router',
        'oc-lazy-load' : 'components/oclazyload/dist/ocLazyLoad',
        'domReady': 'components/domReady/domReady',
        //'jQuery' : 'components/jQuery/dist/jquery.min',
        'app' : './app',
        'config' : './config',
        'AppCtrl' : 'views/lazyLoadRoute/AppCtrl'
    },
    shim: {
        'angular' : {
            exports : 'angular'
        },
        'ui.router' : ['angular'],
        'oc-lazy-load' : ['angular'],
        'domReady' : ['angular'],
        //'jQuery' : [],
        //'app' : ['angular']
    },
    deps : ['bootstrap']
});
