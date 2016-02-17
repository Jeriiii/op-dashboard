dashboardApp.directive('pieNg', ['JsonGraphRes', 'createSVGNode', function(JsonGraphRes, createSVGNode) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
		},
		link: function(scope, elem, attrs) {
			scope.label = {};
			scope.label.style = {
				position: 'absolute',
				'z-index': 1000
			};
			//scope.label.style.position = 'absolute';
		},
		templateUrl: 'dashboard/widgets/pieNg/pie/template.html'
	};
}]);