/**
 * app entry point. loads al the main files nedded for
 * the application to start and bootstrap the application main module
 */

require.config({
    baseUrl : '',
    paths: {
        'angular': 'components/angular/angular.min',
        'ui.router': 'components/angular-ui-router/release/angular-ui-router.min',
        'oc-lazy-load' : 'components/oclazyload/dist/ocLazyLoad.min',
        'domReady': 'components/domReady/domReady',
        //'jQuery' : 'components/jQuery/dist/jquery.min',
        'app' : './app',
        'config' : './config'
    },
    shim: {
         'angular' : {
            exports : 'angular'
        },
        'ui.router' : ['angular'],
        'oc-lazy-load' : ['angular'],
        'domReady' : ['angular'],
        //'jQuery' : [],
        'app' : ['angular']
    },
    deps : ['bootstrap']
});
