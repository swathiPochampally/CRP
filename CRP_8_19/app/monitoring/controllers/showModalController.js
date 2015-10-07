/**
 * Created by ajb3 on 9/2/2015.
 */

monitModule.controller('showModalController',function($scope,$modalInstance, columns){
        $scope.columns = columns;
        //$scope.customTemplateName=templateName;
        $scope.customTemplateName="";
       /* $scope.selected = {
            item: $scope.columns[0]
        };*/

        //var selectedColumns=[];

      /*  $scope.columns.forEach(function(column){
            column.checked=false;
        })
*/
        $scope.columnClick= function(column){
            if(column.checked) {
                //selectedColumns.push(column);
                $scope.columns[$scope.columns.indexOf(column)].checked=true;
            }
            else
            {
                $scope.columns[$scope.columns.indexOf(column)].checked=false;
            }
        };
        $scope.ok = function () {
           var data={};
            data.columns=$scope.columns;
            data.templateName= $scope.customTemplateName;
            $modalInstance.close(data);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

});