/*
 /!**
 * Created by akc8 on 9/1/2015.
 *!/
 monitModule.controller('adminController',['$scope','$modal',function($scope,$modal) {
 $scope.items = ['item1', 'item2', 'item3'];
 $scope.modalInstance = {};
 $scope.open = function () {
 $scope.modalInstance = $modal.open({
 templateUrl: 'app/admin/templates/modalAdmin.html',
 controller: 'modalController',
 resolve: {
 items: function () {
 return $scope.items;
 }
 }
 });
 }


 }]);*/
monitModule.controller('adminController',['$scope','auditFactory','adminFactory','loginService','monFactory',function($scope,auditFactory,adminFactory,loginService,monFactory) {
    var adminpage=auditFactory.insertData;
    var page=auditFactory.pageviewed;
    var action=auditFactory.adminaction;
    var actiontaken=auditFactory.actionTaken;
    var adminaction=adminpage.data;
    var currentpage="Admin";
    var duplicatepage;
    if(currentpage){
        angular.forEach(page, function(value){
            if(currentpage.toLowerCase() == value.toLowerCase()){
                duplicatepage = true;
            }
        });
        if(!duplicatepage){
            page.push(currentpage);
        }
    }
    adminpage.data.pageViewed=page;
    $scope.rolesList=[
        {name:"Internal",code:"I"},
        {name:"External",code:"E"}
    ];
    /* /!* {name:"MGI Compliance User", code:"MCU"},
     {name:"MGI Admin", code:"MA"},
     {name:"Partner Admin", code:"PA"},
     {name:"Partner Compliance User", code:"PCU"}*!/
     ];*/

    $scope.collectLocation=[];
    var roleSelected=[];
    $scope.addLocation= function() {

        $scope.collectLocation.push($scope.selectedUpdateLocation);
        //$scope.selectedUpdateLocation={};
        $scope.selectedUpdateLocation={"name":"", "code":""}

    }
    $scope.deleteLocation = function (index) {
        $scope.collectLocation.splice(index, 1);
    }


    /* $scope.selectedRoleChoice= function(choice){
     $scope.selectedRole= choice;
     }
     $scope.selectedRoleChoice= function(choice){
     $scope.selectedRole= choice;
     if(choice.code=='MA'|| choice.code=='PA')
     {
     $scope.permissionEnable= true;
     }
     else if(choice.code=='MCU'||'PCU')
     {
     $scope.permissionEnable= false;
     }
     }*/

    /* $scope.roleStatus=function(){*/
    $scope.selectedRoleChoice= function(choice){
        $scope.selectedRole= choice;

        if(choice.code =="I"){
            $scope.internalUserList= true;
            $scope.externalUserList= false;
            $scope.roleTag= true;
            $scope.add1= function() {
                if ($scope.internalRoleAdmin) {
                    roleSelected.push("MGI Admin");
                }
                else if ($scope.internalRoleCompUser) {
                    roleSelected.push("MGI Compliance User");
                }

            }
        }
        else if(choice.code =="E"){
            $scope.externalUserList= true;
            $scope.internalUserList= false;
            $scope.roleTag= true;
            $scope.add1= function(){
                if($scope.externalRoleAdmin)
                {
                    roleSelected.push("Partner Admin");
                }
                else if($scope.externalRoleCompUser){
                    roleSelected.push("Partner Compliance User");
                }
                else if ($scope.externalRoleAdmin && $scope.externalRoleCompUser)
                { roleSelected.push("partner Admin","Partner Compliance User");


                }
            }
        }









        /* else if(choice.code=='I'|| choice.code=='E'){
         $scope.roleTag= true;
         }*/
    }
    /*   $scope.internalRole=function(name){
     if(name =="mgiAdmin"){
     $scope.disableMgiCompUser=true;
     }
     else if(name =="mgiCompUser"){
     $scope.disableMgiAdmin= true;
     }
     }*/
    /*  $scope.internalRoleAdmin=function(name){
     if(name =="mgiAdmin"){
     $scope.disableMgiCompUser=true;
     }
     else if(name =="mgiCompUser"){
     $scope.disableMgiAdmin=true;
     }
     }*/
    $scope.clearAll=function(){

        $scope.permissionTitleEnableComp=false;
        $scope.permissionTitleEnable=false;
        $scope.permissionEnable=false;
        $scope.somePermissionsEnable=false;
        $scope.internalUserList= false;
        $scope.externalUserList= false;
        $scope.roleTag= false;

        $scope.internalRoleAdmin=false;
        $scope.internalRoleCompUser=false;
        $scope.externalRoleAdmin=false;
        $scope.externalRoleCompUser=false;
        $scope.chk.permission_grantview=false;
        $scope.chk.permission_grantprint=false;
        $scope.chk.permission_unmaskview=false;
        $scope.chk.permission_unmaskprint=false;




    }

    $scope.clearPermission=function(){
        $scope.permissionEnable=false;
        $scope.somePermissionsEnable=false;

    }
    $scope.admin=function() {
        /* $scope.disableMgiCompUser=true;*/
        /*if(!$scope.internalRoleCompUser && !$scope.internalRoleAdmin || !$scope.externalRoleCompUser &&!$scope.externalRoleAdmin ){
         $scope.permissionEnable = false;
         $scope.somePermissionsEnable = false;
         $scope.permissionTitleEnable = false;

         }*/
        if($scope.selectedRole.code =="E") {
            if ($scope.externalRoleAdmin ) {
                $scope.permissionEnable = true;
                $scope.somePermissionsEnable = false;
                $scope.permissionTitleEnable = true;

            }
            else if (!$scope.externalRoleAdmin ) {
                if($scope.externalRoleCompUser) {
                    $scope.somePermissionsEnable = true;
                    $scope.permissionEnable = false;
                    $scope.permissionTitleEnable = true;
                }
                else if(!$scope.externalRoleCompUser){
                    $scope.somePermissionsEnable = false;
                    $scope.permissionEnable = false;
                    $scope.permissionTitleEnable = false;
                }
            }
        }
        else  if($scope.selectedRole.code =="I"){
            if($scope.internalRoleAdmin ) {
                $scope.somePermissionsEnable = false;
                $scope.permissionEnable = true;
                $scope.permissionTitleEnable = true;
            }
            else if(!$scope.internalRoleAdmin && !$scope.internalRoleCompUser ){
                $scope.somePermissionsEnable = false;
                $scope.permissionEnable = false;
                $scope.permissionTitleEnable = false;
            }
        }

    }
    /*$scope.permissionTitleEnable=true;
     $scope.permissionEnable=true;
     $scope.somePermissionsEnable=false;*/
    /* $scope.permissionTitleEnableComp=false;*/
    /* $scope.internalRoleAdmin=true;
     $scope.externalRoleAdmin= true;
     $scope. internalRoleCompUser= false;
     $scope.externalRoleCompUser= false;*/





    $scope.compUser=function(){

        /* if(!$scope.internalRoleCompUser && !$scope.internalRoleAdmin || !$scope.externalRoleCompUser &&!$scope.externalRoleAdmin ){
         $scope.permissionEnable = false;
         $scope.somePermissionsEnable = false;
         $scope.permissionTitleEnable = false;

         }*/
        if($scope.selectedRole.code == "E"){
            if( $scope.externalRoleCompUser) {
                if(!$scope.externalRoleAdmin ){
                    $scope.somePermissionsEnable = true;
                    $scope.permissionTitleEnable = true;
                    /*   $scope.permissionTitleEnableComp=true;*/
                    $scope.permissionEnable = false;
                }
                else if($scope.externalRoleAdmin ){
                    $scope.somePermissionsEnable = false;
                    $scope.permissionTitleEnable = true;
                    /*   $scope.permissionTitleEnableComp=true;*/
                    $scope.permissionEnable = true;
                }

                /*   $scope.disableMgiAdmin=true;*/

            }
            else if(!$scope.externalRoleCompUser){
                if($scope.externalRoleAdmin) {
                    $scope.somePermissionsEnable = false;
                    $scope.permissionTitleEnable = true;
                    /*   $scope.permissionTitleEnableComp=true;*/
                    $scope.permissionEnable = true;
                }
                else if(!$scope.externalRoleAdmin){
                    $scope.somePermissionsEnable = false;
                    $scope.permissionTitleEnable = false;

                    $scope.permissionEnable = false;
                }
            }
        }
        else if($scope.selectedRole.code =="I"){
            if($scope.internalRoleCompUser) {
                $scope.somePermissionsEnable = true;
                $scope.permissionEnable = false;
                $scope.permissionTitleEnable = true;
            }
            else if(!$scope.internalRoleAdmin && !$scope.internalRoleCompUser ){
                $scope.somePermissionsEnable = false;
                $scope.permissionEnable = false;
                $scope.permissionTitleEnable = false;
            }
        }

    }
    /* $scope.externalAdmin=function(){
     $scope.permissionTitleEnableExternal=true;
     $scope.allPermissionsEnable=true;
     }*/


    /*  $scope.internalUserList=function(internalRoleAdmin,internalRoleCompUser){
     if($scope.internalRoleAdmin){
     $scope.disableMgiCompUser=true;
     }
     else if($scope.internalRoleCompUser){
     $scope.disableMgiAdmin= true;

     }
     }*/
    /*  $scope.selectedRoleChoice= function(choice){
     $scope.selectedRole= choice;
     if(choice.code=='MA'|| choice.code=='PA')

     {
     $scope.disableGrantViewPermission=false;
     $scope.disableGrantPrintPermission=false;
     }
     else if(choice.code=='MCU'||'PCU')
     {
     $scope.disableUnmaskViewPermission=true;
     $scope.disablePrintPermission=true;
     $scope.disableGrantViewPermission=true;
     $scope.disableGrantPrintPermission=true;
     }
     }*/



    $scope.adminSearch= function() {

       /* var currentaction="Search";
        var duplicateaction;
        if(currentaction){
            angular.forEach(adminaction, function(value){
                if(currentaction.toLowerCase() == value.toLowerCase()){
                    duplicateaction = true;
                }
            });
            if(!duplicateaction){
                adminaction.push(currentaction);
            }
        }*/
        var currentaction="Search";
        var duplicateaction;
        if(currentaction){
            angular.forEach(action, function(value){
                if(currentaction.toLowerCase() == value.toLowerCase()){
                    duplicateaction = true;
                }
            });
            if(!duplicateaction){
                action.push(currentaction);
            }
        }
        adminaction.actionTaken=actiontaken;
        adminaction.actionTaken.admin=action;

        var inputData = {
            data: {
                userId: $scope.vm.userId

            }
        };
        adminFactory.adminData(inputData).then(function success(response) {
            if (response.response.data) {
                var responseObject = response.response.data.adminDetails;
                if (responseObject.error) {



                    /*$scope.alerts= {
                     type:'danger',
                     msg: responseObject.error
                     }
                     */
                    $scope.errorMessage = responseObject.error;
                }
                else {
                    $scope.userID = responseObject.userId;
                    $scope.userName = responseObject.givenName;
                    $scope.companyName = responseObject.company;
                    $scope.userType = responseObject.userType;
                    $scope.phoneNumber = responseObject.phoneNumber;
                    $scope.userAddress = responseObject.homePostalAddress;
                    $scope.status = responseObject.webStatus;
                    $scope.emailID = responseObject.mailId;
                    $scope.lastLoginTime = responseObject.lastLoginTime;




                }
            }
        })
    }

    $scope.adminUpdate= function() {

        var currentaction="Save";
        var duplicateaction;
        if(currentaction){
            angular.forEach(action, function(value){
                if(currentaction.toLowerCase() == value.toLowerCase()){
                    duplicateaction = true;
                }
            });
            if(!duplicateaction){
                action.push(currentaction);
            }
        }
        adminaction.actionTaken=actiontaken;
        adminaction.actionTaken.admin=action;
        var inputUpdateData = {
            data: {
                name: $scope.userName,
                companyName: $scope.companyName,
                userId: $scope.userID,
                homePostalAddress: $scope.userAddress,
                role:roleSelected,
                userType:$scope.userType,
                mailId:$scope.emailID,
                webStatus:$scope.status,
                lastLoginTime:$scope.lastLoginTime,
                phoneNumber:$scope.phoneNumber,
                userStatus:$scope.userStatus,
                restrictedDataView: $scope.chk.permission_unmaskview || false,
                restrictedDataPrint: $scope.chk.permission_unmaskprint || false,
                grantAccessView: $scope.chk.permission_grantview || false,
                grantAccessPrint: $scope.chk.permission_grantprint || false,
                /* location: $scope.collectLocation.forEach(function(){
                 return $scope.selectedUpdateLocation.code;
                 })*/
                location:$scope.collectLocation

            }
        };
        adminFactory.adminUpdateData(inputUpdateData).then(function success(response) {
            if (response.response.data) {
                var responseObject = response.response.data.adminDetails;
                if (responseObject.error) {
                    /*$scope.alerts= {
                     type:'danger',
                     msg: responseObject.error
                     }
                     */
                    /*$scope.errorMessage = responseObject.error;*/
                    $scope.alerts = [
                        { type: 'danger', msg:  responseObject.error },
                    ];
                    return;
                }

                /* $scope.message= responseObject.data;*/
                $scope.alerts = [
                    { type: 'success', msg:  responseObject.data },
                ];


            }
        })
    }
    $scope.selectedUpdateLocation={"name":"", "code":""};
    var inputData={"data":{"userId":loginService.userId.get()}};
    if(inputData.data.userId){
        monFactory.getData(inputData).then(function success(responseData){
            if(responseData.response.data.filterDetails) {
                var locationObjectData = responseData.response.data.filterDetails.hierarchyData;
                var locationList = [];
                if(locationObjectData) {
                    for (var i = 0; i < locationObjectData.length; i++) {
                        locationList.push(locationObjectData[i]);
                    }
                }
                $scope.locationList= locationList;
            }
        });

    }


    $scope.checkboxClick= function(permission){

        if(permission.permission_unmaskview){
            $scope.permission_unmaskview="Y"
        }
        else if(permission.permission_unmaskprint)
        {
            $scope.permission_unmaskprint="Y"
        }
        else if(permission.permission_grantview)
        {
            $scope.permission_grantview="Y"

        }
        else if(permission.permission_grantprint)
        {
            $scope.permission_grantprint="Y"
        }

    }

}]);