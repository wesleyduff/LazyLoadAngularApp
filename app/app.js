define(['angular', 'ui.router'], function (angular){
    
    var app = angular.module('marketingAdmin', ['ui.router'])
    
    .config(function($stateProvider, $urlRouterProvider){
        
        $urlRouterProvider.otherwise("welcome");
        
        $stateProvider
            .state('welcome', {
                url : "/welcome",
                templateUrl : "views/welcome/welcome.html",
                controller : function($scope){
                    $scope.title ="Title from Scope";
                }
            })
    })
    
    return app;
});