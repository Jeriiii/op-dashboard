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

dashboardApp.directive('pieChartNg', ['JsonGraphRes', 'createSVGNode', function(JsonGraphRes, createSVGNode) {
  return {
	restrict: 'E',
	replace: true,
	link: function(scope, elem, attrs) {
		console.log(scope.label);

		var drawArcs = function (pieData){
			var colorArr = ["#468966","#FFF0A5","#FFB03B","#B64926","#8E2800"];
			var startAngle = 0;
			var endAngle = 0;
			var x1,x2,y1,y2 = 0;
			var paths = [];
			var id = 1;

			for(var i=0; i <pieData.length; i++){
				var item = pieData[i];

				startAngle = endAngle;
				endAngle = startAngle + item.angle;

				x1 = parseInt(200 + 180*Math.cos(Math.PI*startAngle/180));
				y1 = parseInt(200 + 180*Math.sin(Math.PI*startAngle/180));

				x2 = parseInt(200 + 180*Math.cos(Math.PI*endAngle/180));
				y2 = parseInt(200 + 180*Math.sin(Math.PI*endAngle/180));

				var d = "M200,200  L" + x1 + "," + y1 + "  A180,180 0 0,1 " + x2 + "," + y2 + " z"; //1 means clockwise
				//alert(d);

				//var path = createSVGNode('path', elem, []);

				//var apath = angular.element(path);
				//apath.attr('d', d);

				var colorI = i;
				if(colorI >= colorArr.length) {
					colorI = colorI % colorArr.length;
				}

				//apath.attr("fill",colorArr[i]);


				//element.on('mouseenter', function() {
				//	element.addClass(scope.hoverClass);
				//});
				//element.on('mouseleave', function() {
				//	element.removeClass(scope.hoverClass);
				//});

				scope.mEnter = function(path) {
					path.strokeWidth = 7;
					path.style = {'z-index': 1000};
					id = paths.indexOf(path);
					console.log(id);
					if(id != -1) {
						paths.splice(id, 1);
						paths.push(path);
					}
				};

				scope.mLeave = function(path) {
					path.strokeWidth = 0;
					scope.label.style.display = 'none';
				};

				var elemLeft = elem.offset().left;
				var elemTop = elem.offset().top;
				scope.mMove = function (e) {
					var mPos = {};

					mPos.x = e.pageX - elemLeft;
					mPos.y = e.pageY - elemTop;
					scope.label.style.left = '' + mPos.x + 'px';
					scope.label.style.top ='' +  mPos.y + 'px';
					scope.label.style.display = 'block';

					console.log(mPos);
				}

				/*apath.on('mouseenter', );
				apath.on('mousemove', function(e) {
					var target = angular.element(e.target);

				});
				apath.on('mouseleave', function(e) {
					var target = angular.element(e.target);
					target.attr("fill", target.data('fill'));
					target.attr('stroke-width', '0');
				//	alert('leave element');
				});*/

				//elem.append(apath);
				var pathContainer = {};

				pathContainer.id = id;
				pathContainer.d = d;
				pathContainer.color = colorArr[i];
				pathContainer.strokeWidth = 0;

				paths.push(pathContainer);
				id++;
				//var path = makeNode('path', tElement, tAttr);

				//arc = paper.path(d);
				//arc.attr("fill",colorArr[i]);
			};

			scope.paths = paths;
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
	templateUrl: 'dashboard/widgets/pieNg/pieChart/template.html'
  };
}]);
