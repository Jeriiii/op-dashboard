'use strict';

describe('PieNg test', function() {

	beforeEach(module("dashboardApp"));

	describe("template", function () {
		var $compile; var $scope; var template;
		var widget; var $httpBackend;

		// Načte modul pro zpracování templates
		beforeEach(module('templateUrl'));

		// Injektuje závislosti
		beforeEach(inject(function (_$compile_, _$rootScope_, dModel, _$httpBackend_, wwwRoot) {
			$compile = _$compile_;
			widget = dModel.widgets.pieNg;
			$scope = _$rootScope_.$new();

			$httpBackend =_$httpBackend_;
			responses(_$httpBackend_, wwwRoot);
		}));

		beforeEach(function() {
			$scope.widget = widget;

			template = $compile("<widget-base dbw-title='{{widget.settings.title}}'><pie-ng  relative-url='{{widget.settings.relativeUrl}}' /></widget-base>")($scope);

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

				/* Ověří vykreslení titulku a grafu */
				expect(templateAsHtml).toContain('Věk studentů magisterského studia v roce 2015');
				expect(templateAsHtml).toContain('d="M150,150  L271,220  A140,140 0 1,1 176,12 z"'); //vykreslení jedné z výsečí
			}));
	});
});