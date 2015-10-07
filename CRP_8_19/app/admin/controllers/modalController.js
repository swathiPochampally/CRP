/**
 * Created by akc8 on 9/1/2015.
 */
/**
 * Created by akc8 on 9/1/2015.
 */
monitModule.controller('modalController',function($scope,$modalInstance,items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


});
