angular.module('lazyCtrlModule', [
    [
        "angular.service.vehicles.js"
    ]
])
.controller('lazyCtrlModuleCtrl', ['$scope', 'vehicleListService', function ($scope, vehicleListService) {

    $scope.title = "Welcome!";
    $scope.vehicleListService = vehicleListService.inventory;

}]);
