angular.module('store')
.controller('StoreCtrl', ['$scope', 'vehicleListService', function ($scope, vehicleListService) {

    $scope.title = "Welcome!";
    $scope.vehicleListService = vehicleListService.inventory;

}]);
