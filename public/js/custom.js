var pms = angular.module('pms', []);

pms.factory('OpenTabs', function(){
    return {tabs: [], currentId: -1, currentIndex: -1}
});

pms.service('Projects', function($rootScope){
    var projects = [];

    var projectService = {};

    projectService.setData = function(data){
        projects = data;
        $rootScope.$broadcast('projectsDataSet', true);
    }

    projectService.projects = function(){
        return projects;
    }

    return projectService;
});

pms.controller('projectListController', function ($scope, $http, OpenTabs, Projects) {
    $scope.tabs = OpenTabs.tabs;
    $scope.projects = Projects.projects();

    $scope.$on('projectsDataSet', function(response){
        $scope.projects = Projects.projects();
    });

    angular.element(document).ready(function () {

        $http.post('/getProjects').success(function (data) {
            console.log(data);
            //$scope.projects = data;
            Projects.setData(data);
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
                    OpenTabs.currentId = index;
                    OpenTabs.currentIndex = $scope.tabs.length-1;
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

            if($scope.tabs.length-1 > index && $scope.tabs.length > 0) {
                $scope.tabs[index + 1].active = true;
                OpenTabs.currentIndex = index+1;
                OpenTabs.currentId = $scope.tabs[index+1].id;
            }

            if($scope.tabs.length-1 < index && $scope.tabs.length > 0){
                $scope.tabs[index-1].active = true;
                OpenTabs.currentIndex = index-1;
                OpenTabs.currentId = $scope.tabs[index-1].id;
            }

        }

        $scope.changeTab = function(id, index){
            OpenTabs.currentId = id;
            OpenTabs.currentIndex = index;g;
        }
    });
});

pms.controller('taskModalController', function($scope, $http, OpenTabs){
    $scope.name = '';
    $scope.description = '';
    $scope.tabs = OpenTabs.tabs;

    $scope.sendData = function(){
        $http.post('/addTask', {name: $scope.name, description: $scope.description, projectId: OpenTabs.currentId}).success(function(){
            $http.post('/getTasks', {projectId: OpenTabs.currentId}).success(function (data){
                var temp = [];
                data.forEach(function (datum){
                    temp.push(datum);
                });

                OpenTabs.tabs[OpenTabs.currentIndex].tasks = temp;
            });
        });
    }
});

pms.controller('projectModalController', function($scope, $http, Projects){
    $scope.name = '';
    $scope.description = '';

    $scope.sendData = function(){
        console.log($scope.name + " : " + $scope.description);
        $http.post('/addProject', {name: $scope.name, description: $scope.description}).success(function(){
            $http.post('/getProjects').success(function (data){
                console.log(data);
                Projects.setData(data)
                console.log(Projects.projects);
            });
        });
    }
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