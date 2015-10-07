/**
 * Created by ajb3 on 8/14/2015.
 */
monitModule.factory('monFactory',function($http,$q){

    var getData= function(inputData){
        var deferred= $q.defer();
        var requestUrl= //"http://172.28.92.51:8080/CRP/report/filter/filterData";
            "report/filter/filterData"
            //'json/filterData.json'
        //"http://dmnanlx7261:10080/CRPService/report/filter/filterData";
        //$http.defaults.useXDomain = true;
        $http({
            method: 'POST',
            url: requestUrl,

            data:JSON.stringify(inputData),
            headers: { 'Content-Type': 'application/json' }

        }).success(function(data){
            deferred.resolve({
                response: data,
            });

        }).error(function(msg){
            deferred.reject({
               message: "There is no response from the server."
            });
        })
        return deferred.promise;
    }

    var getTransactionData=function(transactionRequest){

        var deferred= $q.defer();
        var requestUrl='report/preferences/fetchuserpreferences'//"http://localhost:8080/CRP/report/transaction/transactionData";
            //'json/Transaction.json'

        $http({
            method:'POST',
            url:requestUrl ,

            data: JSON.stringify(transactionRequest),
            headers: { 'Content-Type': 'application/json' }
        }).success(function(data){
            deferred.resolve({
                response: data,
            });

        }).error(function(msg){
            deferred.reject({
                message: "There is no response from the server."
            });
        })
        return deferred.promise;
    }

    var getCustomTemplateFilterData= function(inputRequest){

        var deferred= $q.defer();
        var requestUrl= 'report/preferences/fetchcustomtemplatedata'//"http://localhost:8080/CRP/report/transaction/transactionData";
            //'json/Transaction.json'
        //
        $http({
            method:'POST',
            url:requestUrl ,
            data: JSON.stringify(inputRequest),
            headers: { 'Content-Type': 'application/json' }
        }).success(function(data){
            deferred.resolve({
                response: data,
            });

        }).error(function(msg){
            deferred.reject({
                message: "There is no response from the server."
            });
        })
        return deferred.promise;
    }
    var savePreferencesData= function(preferenceInputRequest){
        var deferred= $q.defer();
        var requestUrl='report/preferences/saveuserpreferences' //"http://localhost:8080/CRP/report/transaction/transactionData";
            //'json/Transaction.json'
        $http({
            method:'POST',
            url:requestUrl ,
            data: JSON.stringify(preferenceInputRequest),
            headers: { 'Content-Type': 'application/json' }
        }).success(function(data){
            deferred.resolve({
                response: data,
            });

        }).error(function(msg){
            deferred.reject({
                message: "There is no response from the server."
            });
        })
        return deferred.promise;
    }

    return{
        getData:getData,
        getTransactionData:getTransactionData,
        getCustomTemplateFilterData:getCustomTemplateFilterData,
        savePreferencesData:savePreferencesData
    }

});

