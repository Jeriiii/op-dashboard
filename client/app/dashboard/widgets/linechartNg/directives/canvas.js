/* Directiva pracující s canvasem. */
/**
 * Vrátí nastavení pluginu.
 * @param {object} o Základní nastavení předané aplikaci.
 * @returns {object} Výsledné nastavení doplněné o defaultní a o dopočítané hodnoty.
 */
var getOptions = function (o) {
	o = angular.extend({
		gridColor: '#555555',                   // Barva pozadí grafu
		gridFont: 'normal 11px Arial',          // Používané fonty v canvasu
		gridFontColor: '#222222',               // Barva písma v canvasu
		gridPaddingX: 30,                       // Horizontální rozestup mezi hodnotami (popisky os)
		gridPaddingY: 30,                       // Vertikální rozestup mezi hodnotami (popisky os)
		gridWidth: 1,                           // Šířka X nebo Y osy
		dotsHover: function (dot) {
		},             // Funkce která se zavolá při najetí nad bod
		dotsWidth: 3,                           // Poloměr bodu
		linesColors: [['#CC3333'], ['#3333CC']], // Barvy křivek
		linesWidth: 2,                          // Šířka křívky
		tooltipMarginX: 15,                     // Horizontální odsazení tooltipu od kurzoru při najetí nad bod
		tooltipMarginY: 15                      // Vertikální odsazení tooltipu od kurzoru při najetí nad bod
	}, o);

	o.mmXY = maxXYFn(o.data);

	return o;
};

/**
 * Nakreslí graf do cavasu.
 * @param {scope} $scope Scope canvasu.
 * @param {element} graph Hlavní element této direktivy <canvas />
 * @param {object} o Nastavení grafu.
 */
var linechartCanvas = function ($scope, graph, o) {
	o.graph = {"width": graph.parent().width(), "height": graph.parent().height()};

	graph.attr('width', o.graph.width);
	graph.attr('height', o.graph.height);

	var c = canvasInit(graph, o);
	drawAxises(c, o);

	drawAxisesValue(c, o);
	drawLines(c, o);
};

/**
 * Link fce této direktivy.
 * @param {scope} $scope Scope canvasu.
 * @param {element} graph Hlavní element této direktivy <canvas />
 * @param {object} attrs Atributy předané direktivě.
 * @param {service} JsonChartResource Služba pro posílání dat
 */
var linechartLink = function ($scope, graph, attrs) {
	$scope.$watch('opts', function (opts) {
		/* po http požadavku přidá křivky do grafu */
		if (opts) {
			linechartCanvas($scope, graph, opts);
		}
	});
}

/* Příklad grafu pluginu highchart, který se dá vložit do vydgetu */
dashboardApp.directive('linechartNgCanvas', ['JsonChartResource', function (JsonChartResource) {
	return {
		restrict: 'A',
		link: function ($scope, elem, attrs) {
			return linechartLink($scope, elem, attrs, JsonChartResource);
		},
		transclude: true
	}
}]);
