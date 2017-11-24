angular.module('ngmkdev')
    .directive('toggleNext', function () {
      return {
         restrict: 'A',
         link: function (scope, element, attr) {
             //
             if (attr && attr.toggleNext) {
                 element.bind(attr.toggleNext, function (e) {
                     e.preventDefault();
                     e.stopPropagation();
                     $(this).next('ul').toggle();
                 });
             }
         }
      }
  });
