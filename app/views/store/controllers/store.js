angular.module('storeModule')
.controller('storeCtrl', ['$scope', 'vehicleListService', function ($scope, vehicleListService) {

    $scope.title = "Store APP within the Main APP. I load on click of my tab";
    $scope.vehicleListService = vehicleListService.inventory;

}]);
