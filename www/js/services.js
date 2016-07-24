angular.module('starter.services', [])
.service('DataService',function ($http) {
    this.SetUserData=function(name,age,sex,height,weight,bloodGroup) {
        var userData={
            'Name':name,
            'Age':age,
            'Gender':sex,
            'Height':height,
            'Weight':weight,
            'BloodGroup':bloodGroup
        };
        localStorage.setItem("UserData", JSON.stringify(userData));
    }

    this.GetUserData=function () {
        var myObj = JSON.parse(localStorage.getItem("UserData"));
		return myObj;
    }
    this.RemoveUserData = function () {
            localStorage.removeItem("userData");
        }
    this.callApi=function (age,weight,Ntemp,Ctemp,gender) {
        
        }
    })