dashboardApp.directive('pieNg', ['JsonGraphRes', 'createSVGNode', function(JsonGraphRes, createSVGNode) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
		},
		link: function(scope, elem, attrs) {
			var pieData = [
				{val: 113, tittle: 'Tohle je titulek 113'},
				{val: 100, tittle: 'Tohle je titulek 100'},
				{val: 50, tittle: 'Tohle je titulek 50'},
				{val: 28, tittle: 'Tohle je titulek 28'},
				{val: 27, tittle: 'Tohle je titulek 27'}
			];
			var opts = {};
			opts.data = pieData;
			opts.pieRadius = 180;
			opts.pieColors = ["#468966","#FFF0A5","#FFB03B","#B64926","#8E2800"];

			scope.opts = opts;

			scope.label = {};
			scope.label.style = {
				position: 'absolute',
				'z-index': '1000',
				'max-width': '200px',
				'padding': '3px 8px',
				'color': '#fff',
				'text-align': 'center',
				'background-color': '#000',
				'border-radius': '4px',
			};
			scope.label.text = 'neco';
			//scope.label.style.position = 'absolute';
		},
		templateUrl: 'dashboard/widgets/pieNg/pie/template.html'
	};
}]);