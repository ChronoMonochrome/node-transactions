angular.module('ngmkdev')
    .directive('ngDataTarget', function () {
      return {
         restrict: 'A',
         link: function (scope, element, attr) {
             if (attr && attr.ngDataTarget) {
                 element.bind('click', function (e) {
                     $("#" + attr.ngDataTarget).modal("toggle");
                 });
             }
         }
      }
  });
