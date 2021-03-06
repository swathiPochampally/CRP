/**
 * Created by ajb3 on 8/12/2015.
 */
coreModule.directive('datePickerDirective',function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        link: function (scope) {
            scope.today = function () {
                scope.dt = new Date();
            };
            scope.today();

            scope.clear = function () {
                scope.dt = null;
            };
            scope.open = function ($event) {
                scope.status.opened = true;
            };

            /*scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };*/

            scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            scope.format = scope.formats[3];

            scope.status = {
                opened: false
            };

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 2);
            scope.events =
                [
                    {
                        date: tomorrow,
                        status: 'full'
                    },
                    {
                        date: afterTomorrow,
                        status: 'partially'
                    }
                ];

            scope.getDayClass = function (date, mode) {
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                    for (var i = 0; i < scope.events.length; i++) {
                        var currentDay = new Date(scope.events[i].date).setHours(0, 0, 0, 0);

                        if (dayToCheck === currentDay) {
                            return scope.events[i].status;
                        }
                    }
                }

                return '';
            };

        },
        templateUrl:'app/core/shared/templates/datePickerTemplate.html'
    }
});

