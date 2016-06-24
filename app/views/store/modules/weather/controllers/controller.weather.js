angular.module('weather')
.controller('WeatherCtrl', ['$scope', 'weatherService', function ($scope, weatherService) {

    $scope.title = "Weather Module!";
    $scope.weather = weatherService.getWeather();

}]);
