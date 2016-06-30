(function(angular){
    
    'use strict';
    
    angular.module('marketingAdmin')
    
    .controller('RmlCtrl', ['$scope', function($scope){
        $scope.title = "RML CTRL Title";
    }])
    
})(angular);
(function(angular){
    
    'use strict';
    
    angular.module('marketingAdmin')
    
    .value('a', 123);
    
})(angular);