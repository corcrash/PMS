var pms = angular.module('pms', []);

pms.controller('projectListController', function ($scope, $http) {
    angular.element(document).ready(function () {
        $http.post('/getProjects').success(function (data) {
            console.log(data);
            $scope.projects = data;
        });
    });
});