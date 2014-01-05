define(['app'], function (app) {

    app.controller('modulesCtrl', function ($scope, $ocLazyLoad) {

        /**
         * flag to show the the scoped div
         * @type {{ready: boolean}}
         */
        $scope.module = {
            ready: false
        };

        /**
         * load the module using the ocLazyLoad service
         */
        $ocLazyLoad.load({
            name: 'Utils',
            files: ['resources/modules/utils.js']
        }).then(function () {
                $scope.module.ready = true;
            });
    })
});