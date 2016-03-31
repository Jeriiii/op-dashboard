'use strict';

describe('SimpleText test', function() {

	beforeEach(module("dashboardApp"));

	describe("template", function () {
		var $compile; var $scope; var template;
		var widget; var $httpBackend;

		// Načte modul pro zpracování templates
		beforeEach(module('templateUrl'));

		// Injektuje závislosti
		beforeEach(inject(function (_$compile_, _$rootScope_, dModel, _$httpBackend_, wwwRoot) {
			$compile = _$compile_;
			$scope = _$rootScope_.$new();

			$httpBackend =_$httpBackend_;
			responses(_$httpBackend_, wwwRoot);
		}));

		beforeEach(function() {
			$scope.testTittle = 'Testovací titulek';
			$scope.testText = 'Toto je testovací text, <strong>který</strong> by měl tento widget snadno zobrazit.';
			$scope.escapeHtml = false;

			template = $compile("<widget-base dbw-title='{{testTittle}}'>" +
					"<widget-simple-text dbw-text='{{testText}}' " +
					"dbw-escape-html='{{widget.settings.escapeHtml}}' /></widget-base>"
			)($scope);

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

				/* Ověří vykreslení titulku a grafu */
				expect(templateAsHtml).toContain('Testovací titulek');
				expect(templateAsHtml).toContain('Toto je testovací text, <strong>který</strong> by měl tento widget snadno zobrazit.');
			}));
	});
});