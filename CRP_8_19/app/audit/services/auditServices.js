monitModule.factory('auditFactory',['$http','$q',function($http,$q){


    var auditData=function(data){
    var requestUrl = "/CRP/report/audit/auditdetails";
    var deferred = $q.defer();
    $http({
        method: 'POST',
        url: requestUrl,
        data: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}

    }).success(function (data) {
        deferred.resolve({
            response: data
        });

    }).error(function (msg) {
        deferred.reject({
            message: msg
        });
    })

    return deferred.promise;
 }

    var  exportData=function(){
        var Url = "/CRP/report/audit/auditdetails";
        return $http({
            url:Url,
            method: 'GET'
        });
    }
    var pageviewed=[];
    var auditaction=[];
    var adminaction=[];
    var monitoringaction=[];
    var actionTaken={};
    var insertData={
        data:{
            /*"userId": "",
            "sessionStartDate": "",
            "sessionEndDate": "",
            "pageViewed": [],
            "actionTaken": {
                "Monitoring": [],
                "admin": [],
                "audit": []
            }*/
        }
    };
    return  {
        auditData:auditData,
        exportData:exportData,
        insertData:insertData,
        pageviewed:pageviewed,
        auditaction:auditaction,
        monitoringaction:monitoringaction,
        adminaction:adminaction,
        actionTaken:actionTaken

    };


}]);
