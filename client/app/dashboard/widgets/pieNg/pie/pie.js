var pieChartNg =  function(scope, pieData) {
	var opts = {};
	opts.data = pieData;
	opts.pieRadius = 180;
	opts.pieColors = ["#468966", "#FFF0A5", "#FFB03B", "#B64926", "#8E2800"];

	scope.opts = opts;

	scope.label = {};
	scope.label.style = {
		'position': 'absolute',
		'z-index': '1000',
		'max-width': '200px',
		'padding': '3px 8px',
		'color': '#fff',
		'text-align': 'center',
		'background-color': '#000',
		'border-radius': '4px',
		'display': 'none'
	};
	scope.label.text = 'neco';

	return opts;
}

dashboardApp.directive('pieNg', ['JsonGraphRes', function(JsonGraphRes) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
		},
		link: function(scope, elem, attrs) {
			/* po http požadavku přidá graf */
			var addChart = function(pieData) {
				var opts = pieChartNg(scope, pieData.piechart);

				scope.opts = opts;
			};

			var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
			console.log(relativeUrl);
			var graphData = JsonGraphRes.send(relativeUrl).get();

			graphData.$promise.then(addChart);
		},
		templateUrl: 'dashboard/widgets/pieNg/pie/template.html'
	};
}]);