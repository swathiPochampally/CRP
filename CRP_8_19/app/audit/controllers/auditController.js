monitModule.controller('auditController',['$scope','$rootScope','$filter','auditFactory','monFactory','adminFactory','loginService','$timeout',function($scope,$rootScope,$filter,auditFactory,monFactory,adminFactory,loginService,$timeout){
    var auditpage=auditFactory.insertData;
    var page=auditFactory.pageviewed;
    var action=auditFactory.auditaction;
    var actiontaken=auditFactory.actionTaken;
    var auditaction=auditpage.data;
    var currentpage="Audit";
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
    auditpage.data.pageViewed=page;
    //session
   /* if(auditaction.hasOwnProperty('actionTaken')){
        console.log('m here');
    }
    */
console.log(auditFactory.insertData);
   $scope.reportList=[
        {name:"Usage", code:"UG"},
        {name:"Entitlement", code:"ET"}

    ];
    $scope.rolesList=[
        {name:"MGI", code:"MGI"},
        {name:"Partner", code:"PT"}

    ];
    $scope.selectReport= function(report){
        $scope.selectedReport= report.name;

    }
    $scope.selectRole= function(role){
        $scope.selectedRole= role.name;

    }

     //Date picker
    $scope.datepickers={
        dtStart:false,
        dtEnd:false,
        format: 'MM/dd/yyyy',
        startDate:'',
        endDate:''
    }
    var currentdate = new Date();
    var expecteddate= currentdate.setFullYear(currentdate.getFullYear() - 3);
    var dd = currentdate.getDate();
    var mm = currentdate.getMonth() + 1;
    var y = currentdate.getFullYear();
    var FormattedDate = mm + '/' + dd + '/' + y;

    $scope.$watch('datepickers.startDate', function(newval, oldval){
        var value=$scope.datepickers.startDate;
        var newvalue=  value.getMonth()+1 + "/" + value.getDate() + "/" + value.getFullYear();
        var startdate= Date.parse(newvalue);
        var validdate= Date.parse(FormattedDate);
         if(startdate < validdate){
           $scope.datepickers.startDate='';
            $scope.validstartdate=true;
        }
        else if($scope.datepickers.endDate < $scope.datepickers.startDate) {
            $scope.datepickers.endDate = '';
            $scope.validstartdate=false;
         }
        else{
            $scope.validstartdate=false;
        }


    });

    $scope.$watch('datepickers.endDate', function(newval, oldval){
        if($scope.datepickers.endDate < $scope.datepickers.startDate) {
            $scope.datepickers.endDate = '';
            $scope.validenddate=true;

        }
        else{
            $scope.validenddate=false;

        }
    });

    $scope.open = function ($event,which) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.datepickers[which] = true;
    };

    $scope.collectLocation=[];
    $scope.addLocation= function() {

        $scope.collectLocation.push($scope.selectedUpdateLocation);
        //$scope.selectedUpdateLocation={};
        $scope.selectedUpdateLocation={"name":"", "code":""}

    }
    $scope.deleteLocation = function (index) {
        $scope.collectLocation.splice(index, 1);
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
//Date validation
   $scope.datekey=function($event){
      var x =$event.which || $event.keyCode;
       if ((x>46)&&(x<58)){

        }
        else{
            $event.preventDefault();
        }
    };
    $scope.exporttoexcel=function() {
        var currentaction="Export";
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
        auditaction.actionTaken=actiontaken;
        auditaction.actionTaken.audit=action;
        var startdate = $filter('date')($scope.datepickers.startDate, 'short');
        var enddate=$filter('date')($scope.datepickers.endDate, 'short');

        var object = {
            data:{
                "reportName": $scope.selectedReport,
                "roleType": $scope.selectedRole,
                "startDate": startdate,
                "endDate": enddate,
                "agentLocation": $scope.collectLocation
            }

        };
        $scope.selectedReport = "";
        $scope.selectedRole = "";
        $scope.datepickers.startDate = "";
        $scope.datepickers.endDate = "";
          auditFactory.auditData(object)
            .then(function success(){
                  $scope.exportmsg=true;
                  $timeout(function () { $scope.exportmsg = false; }, 2000);
                  auditFactory.exportData()
                .success(function success(exportdata){
                    var vdata=exportdata.data;
                    var data= vdata.auditDetails.auditEntitlementList;

                    if(data == '')
                        return;

                    JSONToCSVConvertor(data, "Auditing Report", true);


                });

              });

        function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {

            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

            var CSV = '';
            //Set Report title in first row or line

            CSV += ReportTitle + '\r\n\n';

            //This condition will generate the Label/Header
            if (ShowLabel) {
                var row = "";

                //This loop will extract the label from 1st index of on array
                for (var index in arrData[0]) {

                    //Now convert each value to string and comma-seprated
                    row += index + ',';
                }

                row = row.slice(0, -1);

                //append Label row with line break
                CSV += row + '\r\n';
            }

            //1st loop is to extract each row
            for (var i = 0; i < arrData.length; i++) {
                var row = "";

                //2nd loop will extract each column and convert it in string comma-seprated
                for (var index in arrData[i]) {
                    row += '"' + arrData[i][index] + '",';
                }

                row.slice(0, row.length - 1);

                //add a line break after each row
                CSV += row + '\r\n';
            }

            if (CSV == '') {
                alert("Invalid data");
                return;
            }

            //Generate a file name
            var fileName = "MyReport_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += ReportTitle.replace(/ /g,"_");

            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
            var link = document.createElement("a");
            link.href = uri;

            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";

            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }





    }


}]);



