/** 
 * Displays core navigation options at the top of each page
 * @module coreModule 
 * @class headerDirective
 */
define(["core/coreModule"], function () {
    "use strict";
    angular.module("core").directive("coreNavigation", function () {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "/scripts/core/shared/templates/coreNavigationTemplate.html",
            compile: function () {
                $(".navbar li").on("click", function (e) {
                    $(".navbar li").removeClass("active");
                    $(e.target).parent().addClass("active");
                });
            }
        };
    });
});