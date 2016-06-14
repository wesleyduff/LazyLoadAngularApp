define(['angular', 'ui.router', 'oc-lazy-load'], function (angular){
    
    var app = angular.module('marketingAdmin', ['ui.router', 'oc.lazyLoad'])
    
    .config(function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider){
        
        $urlRouterProvider.otherwise("welcome");
        
        /**
         * Config ocLazyLoad to broadcast events
         */
         $ocLazyLoadProvider.config({
             events: true,
             modules : [
                 {
                     name: 'd3',
                     files: ['components/d3/d3.min.js']
                 }]
         });
        
        $stateProvider
            .state('welcome', {
                url : "/welcome",
                templateUrl : "views/welcome/welcome.html",
                controller : function($scope){
                    $scope.title ="Title from Scope";
                }
            })
            .state('loadD3', {
                url : "/loadD3",
                templateUrl : "views/loadD3/index.html",
                controller : function($scope, $ocLazyLoad, $timeout){
                    $scope.title = "d3 load only on this page and only when you start to scroll";
                    $scope.showD3 = false;
                    $timeout(function() {
                        $ocLazyLoad.load('d3');
                    }, 2000);
                    
                    
                    //Hook into the event for ocLazyLoad
                    //When d3 is loaded... show something
                    $scope.$on('ocLazyLoad.fileLoaded', function(e, module) {
                        $scope.showD3 = true;
                        console.log('fileLoaded loaded', module);
                    });
                }
            })
    })
    
    return app;
});