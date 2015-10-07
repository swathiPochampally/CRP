/**
 * Created by akc8 on 8/24/2015.
 */

monitModule.controller('loginController',['$scope','auditFactory','$location','loginFactory','loginService','$timeout',function($scope,auditFactory,$location,loginfactory,loginService,$timeout){
    var logindetails=auditFactory.insertData;
    var loginaction=logindetails.data;


    $scope.loginSubmit= function(){
        var inputData= {
            data:{
                userId: $scope.vm.userId,
                password: $scope.vm.password
            }
        };
        $scope.logginMessage="Logging in..";
        //var inputData={"data": {"userId":"addtest2","password":"New12345^"} };
        loginfactory.authenticateLoginData(inputData).then(function success(response){
            //insert userId
            logindetails.data.userId=$scope.vm.userId;
            //insert session startdate
            var date = $filter('date')(new Date(), 'short');
            logindetails.data.sessionStartDate=date;
            //sessions
            /*$timeout( function(){
                callTimeout();
            }, 5000);
            function callTimeout(){
                if((loginaction.hasOwnProperty('actionTaken'))){

                }
                else{
                    $location.path('/logout');
                }
            }*/
            if(response.response.data){
                $scope.logginMessage="";
                //Need to update the user full name in Header bar.
                var responseObject=response.response.data.authenticationDetails;
                if(responseObject.error){
                    /*$scope.alerts= {
                     type:'danger',
                     msg: responseObject.error
                     }
                     */
                    $scope.alerts = [
                        { type: 'danger', msg:  responseObject.error }
                    ];
                    return;
                    //$scope.errorMessage= responseObject.error;
                }
                loginService.givenName.set(responseObject.givenName);
                loginService.userId.set(responseObject.userId);
                loginService.userType.set(responseObject.userType);
                $location.path('/monitoring');

            }


        }).catch(function(error) {
            $scope.logginMessage="";
            $scope.alerts = [
                { type: 'danger', msg:  "500 Internal Server Error"},
            ];
            return;
        });
    }

    //Alert bar

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };



}]);



/*LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
 function LoginController($location, AuthenticationService, FlashService) {
 var vm = this;

 vm.login = login;

 (function initController() {
 // reset login status
 AuthenticationService.ClearCredentials();
 })();

 function login() {
 vm.dataLoading = true;
 AuthenticationService.Login(vm.username, vm.password, function (response) {
 if (response.success) {
 AuthenticationService.SetCredentials(vm.username, vm.password);
 $location.path('/');
 } else {
 FlashService.Error(response.message);
 vm.dataLoading = false;
 }
 });
 };
 }*/


