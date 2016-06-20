define(['app'], function(app){
    
    
    app
   .config(function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider){
        
        $urlRouterProvider.otherwise("welcome");
        
        /**
         * Config ocLazyLoad to broadcast events
         */
        $ocLazyLoadProvider.config({
             events: true,
             debut: true,
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
            /**
             * Lazy Load modules for a Route using ocLazyLoad : https://oclazyload.readme.io/docs/with-your-router
             */
            .state('lazyLoadCtrl',
                {
                    url : "/lazyLoadCtrl",
                    templateUrl: 'views/lazyLoadRoute/lazyLoadRoute.html',
                    controller : 'AppCtrl',
                    /**
                     * Now we get back a promise
                     */
                     resolve: { //Any property in resolve should return a promise and is executed before the view is loaded
                        load :  function($ocLazyLoad) {
                            // you can lazy load files for an exisiting module
                            return $ocLazyLoad.load({
                                name: 'module1',
                                files: ['views/lazyLoadRoute/module.js']
                            });
                            
                        }
                    }
                }
            )
            .state('lazyCtrlModule',
                {
                    url : "/lazyCtrlModule",
                    templateUrl : "views/store/index.html",
                    controller : 'StoreCtrl',
                    resolve : {
                        load : function($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    name : 'storeCtrl',
                                    files : ['views/store/store.js']
                                });
                        }
                    }
                }
            )
    });
});