define(['./module'], function(module){
   var rmlController = function($scope){
       $scope.title = "Title from rml controller";
   };
   
   module.controller('RmlCtrl', ['$scope', rmlController]);
    
});