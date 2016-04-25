'use strict';

describe('HightChart test', function() {

	beforeEach(module("dashboardApp"));

	describe("template", function () {
		var $compile; var $scope; var template;
		var widget; var $httpBackend;

		// Načte modul pro zpracování templates
		beforeEach(module('templateUrl'));

		// Injektuje závislosti
		beforeEach(inject(function (_$compile_, _$rootScope_, dModel, _$httpBackend_, wwwRoot) {
			$compile = _$compile_;
			widget = dModel.widgets.graph;
			$scope = _$rootScope_.$new();

			$httpBackend =_$httpBackend_;
			responses(_$httpBackend_, wwwRoot);
		}));

		beforeEach(function() {
			$scope.widget = widget;

			template = $compile("<widget-base dbw-title='{{widget.settings.title}}'><graph-example relative-url='{{widget.settings.relativeUrl}}' /></widget-base>")($scope);

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

				/* Ověří vykreslení textů - tedy že se úspěšně spustil a vykreslil plugin hightchart */
				expect(templateAsHtml).toContain('Hightchart');
				expect(templateAsHtml).toContain('Název grafu');
				expect(templateAsHtml).toContain('Testovací serie');
			}));
	});
});