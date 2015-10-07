/** 
 * Displays core navigation options at the top of each page
 * @module coreModule 
 * @class markdownDirective
 */
define(["core/coreModule"], function () {
    "use strict";
    angular.module("core").directive("coreMarkdown", function () {
        var markdownConverter = new Showdown.converter();


        return {
            restrict: "E",
            scope: {
                ngModel: "="
            },
            link: function (scope, element) {
                // Render the initial markdown value
                element.html(markdownConverter.makeHtml(scope.ngModel));

                // Watch the value for changes and re-render as needed
                scope.$watch("ngModel", function () {
                    element.html(markdownConverter.makeHtml(scope.ngModel));
                    element.find("code").addClass("prettyprint");

                    prettyPrint();
                });
            }
        };
    });
});