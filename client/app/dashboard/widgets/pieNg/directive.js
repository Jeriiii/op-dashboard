// Příklad grafu pluginu highchart, který se dá vložit do vydgetu
dashboardApp.value('createSVGNode', function(name, element, settings) {
	var namespace = 'http://www.w3.org/2000/svg';
	var node = document.createElementNS(namespace, name);
	for (var attribute in settings) {
		var value = settings[attribute];
		if (value !== null && !attribute.match(/\$/) && (typeof value !== 'string' || value !== '')) {
			node.setAttribute(attribute, value);
		}
	}
	return node;
});

dashboardApp.directive('pieNg', ['JsonGraphRes', 'createSVGNode', function(JsonGraphRes, createSVGNode) {
  return {
	restrict: 'E',
	replace: true,
	scope: {
	},
	link: function(scope, elem, attrs) {
		console.log("něco");

		var drawArcs = function (pieData){
			//var paper = Raphael("holder");
			var arc;
			var colorArr = ["#468966","#FFF0A5","#FFB03B","#B64926","#8E2800"];
			var startAngle = 0;
			var endAngle = 0;
			var x1,x2,y1,y2 = 0;

			for(var i=0; i <pieData.length; i++){
				var item = pieData[i];

				startAngle = endAngle;
				endAngle = startAngle + item.angle;

				x1 = parseInt(200 + 180*Math.cos(Math.PI*startAngle/180));
				y1 = parseInt(200 + 180*Math.sin(Math.PI*startAngle/180));

				x2 = parseInt(200 + 180*Math.cos(Math.PI*endAngle/180));
				y2 = parseInt(200 + 180*Math.sin(Math.PI*endAngle/180));

				var d = "M200,200  L" + x1 + "," + y1 + "  A180,180 0 0,1 " + x2 + "," + y2 + " z"; //1 means clockwise
				alert(d);

				var path = createSVGNode('path', elem, []);

				angular.element(path).attr('d', d);
				angular.element(path).attr("fill",colorArr[i]);
				elem.append(path);
				//var path = makeNode('path', tElement, tAttr);

				//arc = paper.path(d);
				//arc.attr("fill",colorArr[i]);
			};
		}

		var pieData = [
			{val: 113},
			{val: 100},
			{val: 50},
			{val: 28},
			{val: 27}
		];
		/* součet všech hodnot musí dávat dohromady 360 */
		var total = 0; //součet všech hodnot

		angular.forEach(pieData, function(item) {
			total = total + item.val;
		});

		angular.forEach(pieData, function(item) {
			item.angle = Math.ceil(item.val * 360 / total);
		});



		drawArcs(pieData);





	  ///* po http požadavku přidá graf */
	  //var addChart = function(chartData) {
	  //  $('.bar-chart-jq').cssCharts({
	  //    type:"bar",
	  //    bars: [[4,2],[4,5],[8,3],[4,2]],
	  //    max:"8",
	  //    unit:"k",
	  //    grid:"1",
	  //    width:"20"
	  //  });
	  //};
	  //
	  //addChart();

	  // var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
	  // var graphData = JsonGraphRes.send(relativeUrl).get();
	  //
	  // graphData.$promise.then(addChart);
	},
	transclude: true,
	templateUrl: 'dashboard/widgets/pieNg/template.html'
  };
}]);
