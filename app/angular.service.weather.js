(function(angular){
    'use strict'
    
    angular.module("weatherModule", [])
    
    .service("weatherService", function(){
        this.getWeather = function(){ 
            return {
                city : "Austin",
                state : "Night",
                wind : "15nnw"
            }
        };
    })
})(angular)