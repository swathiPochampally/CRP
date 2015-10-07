monitModule.controller('logoutController',['$scope','logoutFactory','auditFactory','$filter','$location',function($scope,logoutFactory,auditFactory,$filter,$location){

    var date = $filter('date')(new Date(), 'short');

   var app=auditFactory.insertData;
   app.data.sessionEndDate=date;
    logoutFactory.postData(auditFactory.insertData)
        .then(function(success){
            $location.path('/home');
            console.log(auditFactory.insertData);

        });



}]);
