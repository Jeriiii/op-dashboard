/**
 * Zobrazí titulek u bodu v grafu.
 * @param {Object} o Nastavení pluginu.
 * @param {Object} dotHover Vlastnosti téhoto konkrétního bodu - např. tittle.
 * @param {integner} mouseX Xová souřadnice kurzoru.
 * @param {integner} mouseY Yová souřadnice kurzoru.
 * @param {scope} $scope
 */
var showDotTittle = function (o, dotHover, mouseX, mouseY, $scope) {
	$scope.thtml = dotHover.tip;

	var cssLeft = (mouseX + o.tooltipMarginX);
	var cssTop = (mouseY + o.tooltipMarginY) - 10;

	$scope.tcss = {
		'position': 'absolute',
		'left': cssLeft + 'px',
		'top': cssTop + 'px',
		'display': 'block',
		'color': 'white',
		'max-width': '200px',
		'padding': '3px 8px',
		'text-align': 'center',
		'background-color': '#000',
		'border-radius': '4px',
		'cursor': 'pointer'
	};

	$scope.$apply();

	o.dotsHover(dotHover);
}

/**
 * Zobrazí titulek u bodu v grafu.
 * @param {Object} o Nastavení pluginu.
 * @param {scope} $scope
 */
var hideDotTittle = function (o, $scope) {
	$scope.thtml = '';
	$scope.tcss = {
		'position': 'static',
		'positionLeft': '0',
		'positionTop': '0',
		'display': 'none'
	};
	$scope.$apply();
}

/**
 * Najde v datech informace o tom bodu, nad kterým má právě uživatel kurzor.
 * @param {Object} o Nastavení pluginu.
 * @param {integner} mouseX Xová souřadnice kurzoru.
 * @param {integner} mouseY Yová souřadnice kurzoru.
 * @param {scope} $scope
 */
var findHoverDot = function (o, mouseX, mouseY, $scope) {
	for (j = 0; j < o.data.length; j++)
		for (i = 0; i < o.data[j].length; i++) {
			if (typeof o.data[j][i].tip == 'string' && o.data[j][i].tip != '') {
				var dx = mouseX - o.data[j][i].posX;
				var dy = mouseY - o.data[j][i].posY;

				//console.log('prvek X: ' + mouseX + 'souř. X: ' + o.data[j][i].posX);
				//console.log('prvek Y: ' + mouseY + 'souř. Y: ' + o.data[j][i].posY);

				if (dx * dx + dy * dy < o.data[j][i].rXr)
					return o.data[j][i];

			}
		}
}

/**
 * Nabinduje na tečky v grafu titulky, které se zobrazí při najetí myší.
 * @param {Object} o Nastavení pluginu.
 * @param {element} wrap Element nad kterým se direktiva spouští.
 * @param {scope} $scope
 */
var dotsHover = function (o, wrap, $scope) {
	wrap.bind("mousemove", function (e) {
		wrapRect = wrap.offset();

		mouseX = parseInt(e.pageX - wrapRect.left);
		mouseY = parseInt(e.pageY - wrapRect.top);

		var dotHover = findHoverDot(o, mouseX, mouseY, $scope);


		if (dotHover) {
			console.log("show hover");
			showDotTittle(o, dotHover, mouseX, mouseY, $scope);
		} else {
			hideDotTittle(o, $scope);
		}
	});
}

var linechartWarper = function ($scope, elem, options) {
	var o = getOptions(options);

	$scope.tooltip = {'html': '', 'css': ''};
	$scope.thtml = '';
	$scope.tcss = {};
	o.graph = {"width": elem.parent().width(), "height": elem.parent().height()};

	/* nastavý souřadnice pro body grafu */
	for (j = 0; j < o.data.length; j++) {
		for (i = 0; i < o.data[j].length; i++) {
			angular.extend(o.data[j][i], {
				posX: getPointX(o.data[j][i].X, o),
				posY: getPointY(o.data[j][i].Y, o),
				rXr: 16
			});
			console.log(o.data[j][i].posY);
		}
	}
	;

	dotsHover(o, elem, $scope);
}

/** link fce této direktivy */
var linechartNgLink = function ($scope, elem, attrs, JsonChartResource) {
	/* funkce co smaže widget. V této fci se ještě dá udělat ošetření smazání, či vyhodit modal okno */
	var deleteWidget = function () {
		elem.remove();
		$scope.$broadcast('$destroy');
	};

	$scope.remove = deleteWidget;

	var addChart = function (chartData) {
		linechartWarper($scope, elem, {
			data: chartData.linechart
		});
	};

	var relativeUrl = attrs.relativeUrl; //např. 'data/graph1.json'
	var graphData = JsonChartResource.send(relativeUrl).get();

	graphData.$promise.then(addChart);
};

// Prázdný widget
dashboardApp.directive('linechartNg', ['JsonChartResource', function (JsonChartResource) {
	return {
		restrict: 'E',
		scope: {},
		link: function ($scope, elem, attrs) {
			return linechartNgLink($scope, elem, attrs, JsonChartResource);
		},
		templateUrl: 'dashboard/widgets/linechartNg/templates/linechartNg.html',
		transclude: true
	};
}]);
