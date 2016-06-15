define([
    'require',
    'angular',
    'domReady',
    './app',
    './config'],
    function(require, angular, domReady){
        domReady(function(document){
            angular.bootstrap(document, ['marketingAdmin']);
        });
    }
);
