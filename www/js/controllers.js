angular.module('starter.controllers', [])

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

.controller('HomeCtrl', function($scope,$ionicSlideBoxDelegate,$location,DataService,$httpParamSerializerJQLike,$http) {
  
  
  if (DataService.GetUserData()==null) {
         $location.path("/app/editProfile");
  }   
  var hc=this;
  hc.userInput={};
   hc.ShowMessage=true;
  hc.userData=DataService.GetUserData();
  hc.slideOne = function() 
  {
    $ionicSlideBoxDelegate.next();

  }
  hc.slideOneY =function()
  {
     $ionicSlideBoxDelegate.slide(6, [5]);
  }
   hc.slideTwo = function() 
   {
     $ionicSlideBoxDelegate.next();
      hc.userInput.hot=true;
   }
   hc.slideTwoN=function () {
      $ionicSlideBoxDelegate.slide(5, [4]);
    hc.Result="May be you have other diseases! I am sorry, I need a few more updates before I can tell you about other diseases.";
   }
    hc.slideThree = function() 
   {
     if(hc.userInput.temprature==null)
     {
       hc.ShowMessage=false;
     }
     else
     {
        hc.ShowMessage=true;
       $ionicSlideBoxDelegate.next();
     }
    
   }
   hc.removemsg=function () {
     hc.ShowMessage=true;
   }
    hc.slideFour = function() 
   {
    $ionicSlideBoxDelegate.next();
    hc.userInput.pain=true;
   }
   hc.slideFiveN=function()
   {
    $ionicSlideBoxDelegate.slide(5, [4]);
    hc.Result="You most likely have fever";
   
   }
    hc.slideFive = function() 
   {
    var userData=DataService.GetUserData();
    
    var Ntemp=97;
    var userinputData={ 'Age' : userData.Age,'Weight': userData.Weight,'NormalTemperature': Ntemp,'CurrentTemperature' :hc.userInput.temprature,'Gender':(userData.Gender=="Male")?"1":"0"};
    $http({
        url: 'http://idocsos.azurewebsites.net/api/Docs',
        method: "POST",
        data: $httpParamSerializerJQLike(userinputData), // Make sure to inject the service you choose to the controller
        headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
        }        
        })
        .then(function(response) {
                // success
                console.log(response);
            $ionicSlideBoxDelegate.slide(5, [4]);
            hc.Result=response.data.Message;     
        }, 
        function(response) { // optional
               $ionicSlideBoxDelegate.slide(5, [4]);
                hc.Result="Oops! Something went wrong."
                console.log(response);
        });

    // var promise=DataService.callApi( hc.userData.Age, hc.userData.Weight,Ntemp,hc.userInput.temprature, hc.userData.Gender);
    //  promise.then(function (resp)
    //      {
    //        $location.path('/app/result');
    //        hc.Result=resp;
    //      });
    //      $ionicSlideBoxDelegate.next();
   }
   hc.slidesix=function()
   {
     $ionicSlideBoxDelegate.slide(0, [4]);
   }

})
.controller('ProfileCtrl', function($scope,DataService,$location) {
  
  if (DataService.GetUserData()==null) {
         $location.path("/app/profile");
  } 
  
  
  var vm=this;
  vm.userData={};
  vm.GoToEditProfile=function(){
    $location.path('/app/editProfile');
  }
  init();
  function init(){
      vm.userData={};
      vm.userData= DataService.GetUserData();

      // vm.userData={
      //       'Name':'Swagat Swain',
      //       'Age':25,
      //       'Gender':'Male',
      //       'Height':123,
      //       'Weight':85,
      //       'BloodGroup':'O+ve'
      //   }
  }
})
.controller('EditCtrl', function($scope, DataService,$location) {
  
  if (DataService.GetUserData()==null) {
         $location.path("/app/editProfile");
  } 
  
  var vm=this;
  init();
  function init(){
      vm.userData={};
      vm.userData= DataService.GetUserData();

      // vm.userData={
      //       'Name':'Swagat Swain',
      //       'Age':25,
      //       'Gender':'Male',
      //       'Height':123,
      //       'Weight':85,
      //       'BloodGroup':'O+ve'
      //   }
  }

  vm.EditProfile=function(userData){
    console.log(userData);
    DataService.SetUserData(userData.Name,userData.Age,userData.Gender,userData.Height,userData.Weight,userData.BloodGroup);

        $location.path('/app/profile');
    // window.setTimeout(function(){
    // },200);
  }
})
.controller('HistoryCtrl', function($scope, $stateParams) {
});
