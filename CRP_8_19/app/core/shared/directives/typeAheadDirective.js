/**
 * Created by ajb3 on 8/12/2015.
 */

coreModule.directive('typeaheadDirective',function(){
    return{
        restrict:'E',
        replace:true,
        scope:{
            itemData:'=',
            select:'='
        },
        link:function(scope){
            scope.startsWith=function(item,viewValue){
                return  item.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase();
            };
        },
        templateUrl:'app/core/shared/templates/typeaheadTemplate.html'

    }
});

