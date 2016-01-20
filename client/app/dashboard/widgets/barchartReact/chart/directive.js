// Sloupcový graf
// dashboardApp.directive('barchartReact', ['JsonGraphRes', function(JsonGraphRes) {
//   return {
//     restrict: 'E',
//     replace: true,
//     scope: {
//     },
//     link: function(scope, elem, attrs) {
//       var opts = {
//         bars: [[4,2,1,1],[4,5,2,1],[8,9,9,2],[4,4]],
//         unit:"k",
//         grid:"1"
//       };
//
//       correctOptsVal(opts);
//       chartGridNg(scope, elem, opts);
//
//       opts.nodeParent = elem;
//       scope.opts = opts;
//
//       // var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
//       // var graphData = JsonGraphRes.send(relativeUrl).get();
//       //
//       // graphData.$promise.then(addChart);
//     },
//     // transclude: true,
//     templateUrl: 'dashboard/widgets/barchartNg/chart/template.html'
//   };
// }]);

// var helloDirective = function(reactDirective) {
//   return reactDirective('HelloComponent', ['fname', 'lname']);
// };
// helloDirective.$inject = ['reactDirective'];
// dashboardApp.directive('barchartReact', helloDirective);

dashboardApp.directive('barchartReact', function(reactDirective) {
  return reactDirective('HelloComponent');
});
