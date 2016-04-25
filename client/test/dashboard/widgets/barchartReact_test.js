'use strict';

describe('BarchartReact test', function() {

	beforeEach(module("dashboardApp"));

	describe("template", function () {
		var $compile; var $scope; var template;
		var widget; var $httpBackend;

		// Načte modul pro zpracování templates
		beforeEach(module('templateUrl'));

		// Injektuje závislosti
		beforeEach(inject(function (_$compile_, _$rootScope_, dModel, _$httpBackend_, wwwRoot) {
			$compile = _$compile_;
			widget = dModel.widgets.barchartReact;
			$scope = _$rootScope_.$new();

			$httpBackend =_$httpBackend_;
			responses(_$httpBackend_, wwwRoot);
		}));

		beforeEach(function() {
			$scope.widget = widget;

			template = $compile("<widget-base dbw-title='{{widget.settings.title}}'><barchart-ng  relative-url='{{widget.settings.relativeUrl}}' /></widget-base>")($scope);

			$scope.$digest();

		});

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it("should render the header and text as passed in by $scope",
			inject(function () {
				$httpBackend.flush();

				/* vytvoří HTML z templaty dashboardu */
				var templateAsHtml = template.html();

				/* Ověří, že jsou vykresleny všechny nadpisy widgetů */
				expect(templateAsHtml).toContain('Přehled o přijimacím řízení 2013 / 2014 / 2015 React');

				/* Ověří, že jsou vykreslena i data widgetů. To znamená že ověří, že byli widgety
				 * v dashboardu správně vyktresleny, jednotlivé widgety si zažádali server o data
				 * ten jim je vrátil a oni je zpracovali a vykreslili*/
				expect(templateAsHtml).toContain('přihláš. 134k');
				expect(templateAsHtml).toContain('zapsa. 75k');
			}));
	});
});