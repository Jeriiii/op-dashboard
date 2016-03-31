'use strict';

describe('Clock test', function() {

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
			$scope.testTitle = 'Toto je testovací titulek';
			$scope.testFormat = 'HH:mm:ss';

			template = $compile("<widget-base dbw-title='{{testTitle}}'><widget-clock format='{{testFormat}}' /></widget-base>")($scope);

			$scope.$digest();

		});

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it("should render the header and text as passed in by $scope",
			inject(function () {
				/* vytvoří HTML z templaty dashboardu */
				var templateAsHtml = template.html();

				/* Ověří vykreslení textů */
				expect(templateAsHtml).toContain('Toto je testovací titulek');
				expect(templateAsHtml).toMatch(/[0-9]{2}:[0-9]{2}:[0-9]{2}/); //kontrola, zda se zobrazili hodiny
			}));
	});
});