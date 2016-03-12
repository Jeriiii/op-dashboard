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
		var piePadding = 10; //volné místo nad a pod grafem
		var m = pieSize + piePadding; //souřadnice poč. bodu

		var pieHeight = 2 * (pieSize + piePadding);
		var pieWidth = 2 * (pieSize + piePadding);

		scope.pieHeight = pieHeight;
		scope.pieWidth = pieWidth;

		for(var i=0; i <pieData.length; i++){
			var item = pieData[i];

			startAngle = endAngle;
			endAngle = startAngle + item.angle;

			x1 = parseInt(m + pieSize*Math.cos(Math.PI*startAngle/180));
			y1 = parseInt(m + pieSize*Math.sin(Math.PI*startAngle/180));

			x2 = parseInt(m + pieSize*Math.cos(Math.PI*endAngle/180));
			y2 = parseInt(m + pieSize*Math.sin(Math.PI*endAngle/180));

			var largeArch = ((endAngle-startAngle > 180) ? 1 : 0);
			var d = "M" + m + "," + m + "  L" + x1 + "," + y1 + "  A" + pieSize + "," + pieSize + " 0 " + largeArch + ",1 " + x2 + "," + y2 + " z";

			var colorI = i;
			if(colorI >= colorArr.length) {
				colorI = colorI % colorArr.length;
			}

			var pathContainer = {};

			pathContainer.id = id;
			pathContainer.d = d;
			pathContainer.color = colorArr[colorI];
			pathContainer.strokeWidth = 0;
			pathContainer.tittle = item.tittle + ': ' + item.val;

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

/* Tato direktiva se již skutečně stará o vykreslení grafu samotného - tedy vakreslení jednotlivých výsečí */
dashboardApp.directive('pieChartNg', ['JsonChartResource', function(JsonChartResource) {
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
