var pieChartNg =  function(scope, pieData) {
	var opts = {};
	opts.data = pieData;
	opts.pieRadius = 140;
	opts.pieColors = ["#468966", "#FFF0A5", "#FFB03B", "#B64926", "#8E2800", '#F49AC2', '#CB99C9', '#C23B22', '#DEA5A4'];

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

dashboardApp.directive('pieNg', ['JsonChartResource', function(JsonChartResource) {
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
			var graphData = JsonChartResource.send(relativeUrl).get();

			graphData.$promise.then(addChart);
		},
		templateUrl: 'dashboard/widgets/pieNg/pie/template.html'
	};
}]);