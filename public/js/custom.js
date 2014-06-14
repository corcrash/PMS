var pms = angular.module('pms', []);

pms.controller('projectListController', function ($scope, $http) {
    angular.element(document).ready(function () {
        $http.post('/getProjects').success(function (data) {
            console.log(data);
            $scope.projects = data;
        });
    });
});

// jQuery ######################################################################

$(document).ready(function(){
    bindClicks();
});

function bindClicks(){
    $("#displayProfile").click(showProfileModal);
}

function saveProfile(){
    var profileData = {
        display_name: $("#profileDisplayName").val(),
        description: $("#prodileDescription").val(),
        avatar: $("#profileAvatar").attr("src"),
    }
}

function showProfileModal(){
    $.post('/getProfile', function (data){
        $("#profileModalBody").html(data);
        $("#profileModal").modal({keyboard: true});
    })
}