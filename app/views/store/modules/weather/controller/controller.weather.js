angular.module('weather')
.controller('WeatherCtrl', ['$scope', 'weatherService', function ($scope, weatherService) {

    $scope.title = "Welcome!";
    $scope.weather = weatherService.getWeather();

}]);
