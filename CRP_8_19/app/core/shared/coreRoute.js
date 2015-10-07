/**
 * Created by ajb3 on 8/11/2015.
 */
coreModule.config(function($routeProvider){
    $routeProvider
        // route for the home page(Currently set as Monitoring page, need to replace with home page)
        .when('/',{
            templateUrl:"app/login/templates/login.html",
           // controller:'monitoringController'
        })
        // route for the monitoring page
        .when('/monitoring',{
            templateUrl:"app/monitoring/templates/monitoring.html",
            controller:'monitoringController'
        })
        .when('/home',{
            templateUrl:"app/login/templates/login.html",
            controller:'loginController'
        })
        .when('/Administration',{
            templateUrl:"app/admin/templates/Admin.html",
            controller:'adminController'
        })
        .when('/Audit',{
            templateUrl:"app/audit/templates/audit.html",
            controller:'auditController'
        })
        .when('/logout',{
            templateUrl:"app/logout/templates/logout.html",
            controller:'logoutController'
        })
});

/*
coreModule.config(['$httpProvider', function($httpProvider) {

    $httpProvider.defaults.useXDomain = true;

    delete $httpProvider.defaults.headers.common['X-Requested-With'];

}

]);*/
