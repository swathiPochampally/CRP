define([
    "angularMocks",
    "application/areas/dashboard/dashboardController"
], function (mocks) {
    "use strict";

    describe("dashboard controller", function () {
        var controller, scope;

        beforeEach(function () {
            mocks.module("core");
            inject(function ($rootScope, $controller) {
                scope = $rootScope.$new();
                controller = $controller("applicationDashboardController", {
                    $scope: scope
                });
            });
        });


        it("can intialize the controller", function () {
            expect(controller).toBeDefined();
            expect(scope.description).toBeDefined();
            expect(scope.readme).toBeDefined();

            expect(scope.description).not.toBe("");
            expect(scope.readme).toBe("");
        });
    });
});