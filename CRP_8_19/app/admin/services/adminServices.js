/**
 * Created by akc8 on 9/1/2015.
 */
monitModule.factory('adminFactory',function($http,$q) {

    var adminData = function (inputData) {

        var requestUrl = //"http://172.28.92.51:8080/CRP/report/filter/filterData";
            //"http://dmnanlx7261:10080/CRPService/report/filter/filterData";
            //$http.defaults.useXDomain = true;
            "/CRP/report/admin/fetchuser";
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: requestUrl,

            data: JSON.stringify(inputData),
            headers: {'Content-Type': 'application/json'}

        }).success(function (data) {
            deferred.resolve({
                response: data,
            });

        }).error(function (msg) {
            deferred.reject({
                message: msg
            });
        })

        return deferred.promise;
    }

    var adminUpdateData = function (inputUpdateData) {

        var requestUrl = //"http://172.28.92.51:8080/CRP/report/filter/filterData";
            //"http://dmnanlx7261:10080/CRPService/report/filter/filterData";
            //$http.defaults.useXDomain = true;
            "/CRP/report/admin/update";
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: requestUrl,

            data: JSON.stringify(inputUpdateData),
            headers: {'Content-Type': 'application/json'}

        }).success(function (data) {
            deferred.resolve({
                response: data,
            });

        }).error(function (msg) {
            deferred.reject({
                message: msg
            });
        })

        return deferred.promise;
    }

    return{
        adminData:adminData ,
        adminUpdateData:adminUpdateData

    }
});