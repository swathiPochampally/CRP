var monitModule= angular.module('monitModule',['ngAnimate','coreModule','ui.grid','ui.grid.resizeColumns','ui.grid.moveColumns','ui.grid.pagination','ui.grid.grouping'])

monitModule.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);