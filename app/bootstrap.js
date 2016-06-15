define([
        'domReady', 
        'angular', 
        'app', 
        'config'
    ],
    function(domReady, angular){
        domReady(function(document){
            angular.bootstrap(document, ['marketingAdmin']);
        });
    }
);
