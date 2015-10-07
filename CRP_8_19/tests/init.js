"use strict";

/*
 * Discover test specs
 */
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

/*
 * require.js configuration which overrides essential configuration settings
 * and adds new settings needed by the testing infrastructure.
 */
require.config({
    baseUrl: "/base/scripts",
    paths: {
        angularMocks: [
            "core/libraries/angular-mocks"
        ]
    },
    shim: {
        "angularMocks": {
            deps: ["Angular"],
            exports: "angular.mock"
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});