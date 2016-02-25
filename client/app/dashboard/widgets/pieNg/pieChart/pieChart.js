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

/**
 * Dopočítá souřadnice jednotlivých výsečí a nakreslí graf.
 * @param {scope} scope Scope.
 * @param {element} elem Element.
 * @param {object} opts Nastavení grafu.
 *
 */
var createPieChartNg = function(scope, elem, opts) {
	var drawArcs = function (pieData){
		var colorArr = opts.pieColors;
		var startAngle = 0;
		var endAngle = 0;
		var x1,x2,y1,y2 = 0;
		var paths = [];
		var id = 1;
		var pieSize = opts.pieRadius;

		for(var i=0; i <pieData.length; i++){
			var item = pieData[i];

			startAngle = endAngle;
			endAngle = startAngle + item.angle;

			x1 = parseInt(200 + pieSize*Math.cos(Math.PI*startAngle/180));
			y1 = parseInt(200 + pieSize*Math.sin(Math.PI*startAngle/180));

			x2 = parseInt(200 + pieSize*Math.cos(Math.PI*endAngle/180));
			y2 = parseInt(200 + pieSize*Math.sin(Math.PI*endAngle/180));

			var d = "M200,200  L" + x1 + "," + y1 + "  A" + pieSize + "," + pieSize + " 0 0,1 " + x2 + "," + y2 + " z";

			var colorI = i;
			if(colorI >= colorArr.length) {
				colorI = colorI % colorArr.length;
			}

			var pathContainer = {};

			pathContainer.id = id;
			pathContainer.d = d;
			pathContainer.color = colorArr[colorI];
			pathContainer.strokeWidth = 0;
			pathContainer.tittle = item.tittle;

			paths.push(pathContainer);
		};

		scope.mEnter = function(path) {
			path.strokeWidth = 7;
			path.style = {'z-index': 1000};
			id = paths.indexOf(path);

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
		scope.mMove = function (e, path) {
			var mPos = {};

			scope.label.text = path.tittle;

			mPos.x = e.pageX - elemLeft;
			mPos.y = e.pageY - elemTop;
			scope.label.style.left = '' + mPos.x + 'px';
			scope.label.style.top ='' +  mPos.y + 'px';
			scope.label.style.display = 'block';
		};

		scope.paths = paths;
	};

	/* součet všech hodnot musí dávat dohromady 360 */
	var total = 0; //součet všech hodnot

	angular.forEach(opts.data, function(item) {
		total = total + item.val;
	});

	angular.forEach(opts.data, function(item) {
		item.angle = Math.ceil(item.val * 360 / total);
	});

	drawArcs(opts.data);
};

dashboardApp.directive('pieChartNg', ['JsonChartResource', 'createSVGNode', function(JsonChartResource, createSVGNode) {
  return {
	restrict: 'E',
	replace: true,
	link: function(scope, elem, attrs) {
		opts = scope.opts;

		scope.$watch('opts', function(opts, oldValue) {
			/* po http požadavku přidá graf */
			if(opts) {
				createPieChartNg(scope, elem, opts);
			}
		});


	},
	templateUrl: 'dashboard/widgets/pieNg/pieChart/template.html'
  };
}]);
