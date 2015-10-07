/**
 * Created by ajb3 on 8/12/2015.
 */

coreModule.directive('dropdownDirective',function(){
    return{
        restrict:'E',
        replace:true,
        scope:{
            itemData:'=',
            label:'='
        },
        link:function(scope){
            //scope.items=scope.itemData;
            //scope.label="State";
            scope.status = {
                isopen: false
            };

        },
        controller: function($scope){
            $scope.selectedChoice=function(choice){
                $scope.label=choice;
            };
        },
        templateUrl:'app/core/shared/templates/dropDownTemplate.html'

    };
});