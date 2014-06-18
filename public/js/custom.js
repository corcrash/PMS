var pms = angular.module('pms', []);
var projectTabs = [];
pms.controller('projectListController', function ($scope, $http) {
    angular.element(document).ready(function () {
        $http.post('/getProjects').success(function (data) {
            console.log(data);
            $scope.projects = data;
        });

        $scope.doStuff = function(index) {
            //vraca index kliknutog elementa iz levog bara
            $http.post('/getProject', {projectId:index}).success(function (data) {
                $scope.project = data;


//            alert($scope.project.name);
//            alert($scope.project.id);
//            alert($scope.project.description);
//                registerComposeButtonEvent($scope.project.id, $scope.project.name, $scope.project.description, $scope.project.create_time);
//                projectTabs.push( {
//                    title: $scope.project.name,
//                    content: $scope.project.description
//                });
//                $scope.removeTab=function(index) {
//                    projectTabs.splice(index,1);
//
//                }
//                $scope.tabs=projectTabs;
//                console.log($scope.tabs[0].title);
//                console.log("TEEEEEEST");
            });

        }
    });
});

pms.controller('tabsController', function($scope){
    angular.element(document).ready(function () {
        projectTabs.push( {
//            title: $scope.project.name,
//            content: $scope.project.description
            title: $scope.project.name,
            content: $scope.project.content
        });
        $scope.removeTab=function(index) {
            projectTabs.splice(index,1);

        }
        $scope.tabs=projectTabs;
        console.log($scope.tabs[0].title);
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
            else
            {
                if(data.message === 'image_too_big'){
                    $('#avatarUploadButton').popover({animation: true, trigger: 'manual', placement: 'right', content: "The image is too big!"})
                }

                if(data.message === 'image_upload_unsuccessful'){
                    $('#avatarUploadButton').popover({animation: true, trigger: 'manual', placement: 'right', content: "There was a problem while uploading the image!"})
                }
            }
        });

    });
}

function saveProfile() {
    var profileData = {
        displayName: $("#profileDisplayName").val(),
        description: $("#prodileDescription").val()
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

