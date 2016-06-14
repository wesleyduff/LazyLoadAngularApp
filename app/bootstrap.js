define([
    'require',
    'angular',
    'domReady',
    './app'],
    function(require, angular, domReady){
        domReady(function(document){
            angular.bootstrap(document, ['marketingAdmin']);
        });
    }
);
