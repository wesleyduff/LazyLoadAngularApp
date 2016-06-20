(function(angular){
    'use strict'
    
    angular.module("vehicles", [])
    
    .service("vehicleListService", function(){
        this.inventory = [
            {
                model : "Eqinox",
                year : "2016",
                make : "Chevrolet"
            },
            {
                model : "Mustang",
                year : "2015",
                make : "Ford"
            },
            {
                model : "Golf GTI",
                year : "2015",
                make : "Volkswagen"
            }
        ]
    })
})(angular)