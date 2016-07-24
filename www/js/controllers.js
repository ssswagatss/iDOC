angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('HomeCtrl', function($scope,$ionicSlideBoxDelegate) {
  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }
})
.controller('ProfileCtrl', function($scope,DataService,$location) {
  var vm=this;
  vm.userData={};
  vm.GoToEditProfile=function(){
    $location.path('/app/editProfile');
  }
  init();
  function init(){
      vm.userData={};
      //vm.userData= DataService.GetUserData();

      vm.userData={
            'Name':'Swagat Swain',
            'Age':25,
            'Gender':'Male',
            'Height':123,
            'Weight':85,
            'BloodGroup':'O+ve'
        }
  }
})
.controller('EditCtrl', function($scope, DataService,$location) {
  var vm=this;
  init();
  function init(){
      vm.userData={};
      //vm.userData= DataService.GetUserData();

      vm.userData={
            'Name':'Swagat Swain',
            'Age':25,
            'Gender':'Male',
            'Height':123,
            'Weight':85,
            'BloodGroup':'O+ve'
        }
  }

  vm.EditProfile=function(userData){
    console.log(userData);
    DataService.SetUserData(userData.Name,userData.Age,userData.Gender,userData.Height,userData.Weight,userData.BloodGroup);
    $location.path("app/profile");
  }
})
.controller('HistoryCtrl', function($scope, $stateParams) {
});
