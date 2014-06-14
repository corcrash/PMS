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

$(document).ready(function () {
    loadProfile();
    bindClicks();
});

function bindClicks() {
    $("#displayProfile").click(showProfileModal);
    $("#saveProfile").click(saveProfile);
}

function loadProfile() {
    $.post('/getProfile', function (data) {
        $("#profileModalBody").html(data);
        $('#avatarForm').ajaxForm(function (data) {
            if(data.status){
                $("#profileAvatar").attr('src', data.url);
            }
        });

    });
}

function saveProfile() {
    var profileData = {
        displayName: $("#profileDisplayName").val(),
        description: $("#prodileDescription").val(),
    }

    $.post('/editProfile', {profileInfo: profileData}).done(function (response) {
        if (response.status) {
            $("#saveProfile").popover({animation: true, placement: 'right', trigger: 'manual', content: "Successfully saved the changes!"});
        }
        else {
            $("#saveProfile").popover({animation: true, placement: 'right', trigger: 'manual', content: "Error while saving the changes!"});
        }

        $("#saveProfile").popover('show');
    });

    console.log("posted");
}

function showProfileModal() {
    $("#profileModal").modal({keyboard: true});
}