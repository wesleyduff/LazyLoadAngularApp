angular.module('storeModule')
.controller('storeCtrl', ['$scope', 'vehicleListService', function ($scope, vehicleListService) {

    $scope.title = "Welcome!";
    $scope.vehicleListService = vehicleListService.inventory;

}]);
