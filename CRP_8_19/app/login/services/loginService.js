/**
 * Created by akc8 on 8/25/2015.
 */
monitModule.factory('loginFactory',function($http,$q){

    var authenticateLoginData= function(inputData){

        var requestUrl= //"http://172.28.92.51:8080/CRP/report/filter/filterData";
                        //"http://dmnanlx7261:10080/CRPService/report/filter/filterData";
            //$http.defaults.useXDomain = true;
            "/CRP/report/user/authenticate";
        var deferred= $q.defer();
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
                message: msg
            });
        })

        return deferred.promise;

        //$http.post('/api/authenticate', { username: username, password: password })
        //    .success(function (response) {
        //        callback(response);
        //    });
    }
    return{
        authenticateLoginData:authenticateLoginData
    }

});

monitModule.service('loginService',function(){

    var userIdValue, userTypeValue, givenNameValue;

    this.userId= {
        get: function(){
            return userIdValue;
        },
        set: function(value){
            userIdValue=value;
        }
    };
    this.userType={
        get: function(){
            return userTypeValue;
        },
        set: function(value){
            userTypeValue=value;
        }
    };
    this.givenName= {
        get: function(){
            return givenNameValue;
        },
        set: function(value){
            givenNameValue=value;
        }
    };

});
