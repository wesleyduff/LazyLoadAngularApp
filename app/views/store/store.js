angular.module('store', [
    {
        name : "vehicles",
        files : ["angular.service.vehicles.js"]
    }    
])
.controller('StoreCtrl', ['$scope', 'vehicleListService', function ($scope, vehicleListService) {

    $scope.title = "Welcome!";
    $scope.vehicleListService = vehicleListService.inventory;

}]);
