var pms = angular.module('pms', []);

pms.factory('OpenTabs', function(){
    return {tabs: []}
});

pms.controller('projectListController', function ($scope, $http, OpenTabs) {
    angular.element(document).ready(function () {

        $scope.tabs = OpenTabs.tabs;

        $http.post('/getProjects').success(function (data) {
            console.log(data);
            $scope.projects = data;
        });

        $scope.doStuff = function(index) {
            //vraca index kliknutog elementa iz levog bara
            console.log("Tabs: " + $scope.tabs);
            $http.post('/getProject', {projectId:index}).success(function (data) {
//               $scope.project = data;
                var n=false;
                angular.forEach($scope.tabs, function (value,key) {
                   if(value.id == index) {
                       n=true;
                   }
                });
                if(n==false) {
					setActiveFalse($scope.tabs);
                    var temp = {
                        title: data.name,
                        id: data.id,
                        description: data.description,
						active: true,
                        tasks: []
                    };

                    $http.post('/getTasks', {projectId: index}).success(function (data){
                        console.log(data);
                        data.forEach(function (datum){
                            temp.tasks.push(datum);
                        });

                        console.log(temp);
                    });

                    $scope.tabs.push(temp);
                }
            });

        }
    });
});

pms.controller('tabsController', function($scope, OpenTabs){
    angular.element(document).ready(function () {
        $scope.tabs = OpenTabs.tabs;

        $scope.removeTab=function(index) {
            $scope.tabs.splice(index,1);

            if($scope.tabs.length-1 > index && $scope.tabs.length > 0)
                $scope.tabs[index+1].active = true;

            if($scope.tabs.length-1 < index && $scope.tabs.length > 0)
                $scope.tabs[index-1].active = true;
        }
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

function setActiveFalse(tabs) {
    angular.forEach(tabs, function(tab) {
        tab.active=false;
    })
}