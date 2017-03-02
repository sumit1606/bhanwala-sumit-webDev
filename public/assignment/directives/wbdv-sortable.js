/**
 * Created by sumitbhanwala on 2/28/17.
 */

(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir() {
        function linkfunc(scope, element, attributes) {
            // start will be the current index for the current
            // element and final will be the location where we drop the widget
            var start = - 1 ;
            var final = -1 ;
            element.sortable({
                axis: 'y',
                cursor: "move",
                start: function(event,ui){
                    start=ui.item.index();
                },
                stop : function (event ,ui) {
                    final  = ui.item.index();
                    if (start != final){
                        scope.model.reOrderWidgets(start, final);}
                }

            });
        }
        return {
            link: linkfunc
        }
    }
})();
