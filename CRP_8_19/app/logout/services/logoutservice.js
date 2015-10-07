monitModule.factory('logoutFactory',function($http,$q) {

    var postData = function (inputData) {
        var deferred = $q.defer();
        var requestUrl =
            /*"json/logout.json";*/
        "/CRP/report/audit/insertauditdata";

        $http({
            method: 'POST',
            url: requestUrl,

            data: JSON.stringify(inputData),
            headers: {'Content-Type': 'application/json'}

        }).success(function (data) {
            deferred.resolve({
                response: data,
            });

        }).error(function(msg) {
            deferred.reject({
                message: "There is no response from the server."
            });
        })
        return deferred.promise;
    }
    return {
        postData: postData
    }
});
