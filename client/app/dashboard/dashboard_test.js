'use strict';

var responses = function($httpBackend, wwwRoot) {
	$httpBackend.when('GET', wwwRoot + '/server/?type=hightchart').respond(200,
		{"serieName":"Testovac\u00ed serie","data":[{"name":"ideas1","data":1},{"name":"ideas2","data":8},{"name":"ideas3","data":5}]}
	);
	$httpBackend.when('GET', wwwRoot + '/server/?type=linechart').respond(200,
		{"linechart":{"data":[[{"X":2010,"Y":66,"tip":"P\u0159ihl\u00e1\u0161ek 2010 - 331536"},
		{"X":2011,"Y":66,"tip":"P\u0159ihl\u00e1\u0161ek 2011 - 330066"},
		{"X":2012,"Y":62,"tip":"P\u0159ihl\u00e1\u0161ek 2012 - 309452"},
		{"X":2013,"Y":58,"tip":"P\u0159ihl\u00e1\u0161ek 2013 - 290953"},
		{"X":2014,"Y":52,"tip":"P\u0159ihl\u00e1\u0161ek 2014 - 260467"},
		{"X":2015,"Y":48,"tip":"P\u0159ihl\u00e1\u0161ek 2015 - 243718"}],
		[{"X":2010,"Y":21,"tip":"P\u0159ijat\u00fdch 2010 - 106437"},
		{"X":2011,"Y":20,"tip":"P\u0159ijat\u00fdch 2011 - 103761"},
		{"X":2012,"Y":19,"tip":"P\u0159ijat\u00fdch 2012 - 98261"},
		{"X":2013,"Y":18,"tip":"P\u0159ijat\u00fdch 2013 - 93714"},
		{"X":2014,"Y":16,"tip":"P\u0159ijat\u00fdch 2014 - 84765"},
		{"X":2015,"Y":15,"tip":"P\u0159ijat\u00fdch 2015 - 78137"}]],"unitX":"","unitY":"k"}}
	);
	$httpBackend.when('GET', wwwRoot + '/server/?type=barchart').respond(200,
		{"bars":[[{"data":134,"name":"p\u0159ihl\u00e1\u0161."},{"data":94,"name":"p\u0159ijat."},{"data":88,"name":"zapsa."}],
		[{"data":121,"name":"p\u0159ihl\u00e1\u0161."},{"data":85,"name":"p\u0159ijat."},{"data":79,"name":"zapsa."}],
		[{"data":113,"name":"p\u0159ihl\u00e1\u0161."},{"data":80,"name":"p\u0159ijat."},{"data":75,"name":"zapsa."}]],
		"unit":"k","grid":"1"}
	);
	$httpBackend.when('GET', wwwRoot + '/server/?type=pie').respond(200,
		{"piechart":[{"val":2643,"tittle":"15 - 19 let"},{"val":22165,"tittle":"20 - 24 let"},{"val":5118,"tittle":"25 - 29 let"},
		{"val":785,"tittle":"30 - 34 let"},{"val":510,"tittle":"35 - 39 let"},{"val":572,"tittle":"40 let a star\u0161\u00ed"}]}
	);

	$httpBackend.when('GET', wwwRoot + '/server/?type=barchart-test').respond(200,
		{"bars":[[{"data":134,"name":"p\u0159ihl\u00e1\u0161."},{"data":94,"name":"p\u0159ijat."},{"data":88,"name":"zapsa."}],
		[{"data":121,"name":"p\u0159ihl\u00e1\u0161."},{"data":85,"name":"p\u0159ijat."},{"data":79,"name":"zapsa."}],
		[{"data":113,"name":"p\u0159ihl\u00e1\u0161."},{"data":80,"name":"p\u0159ijat."},{"data":75,"name":"zapsa."}]],
		"unit":"k","grid":"1","performanceTest":true,"performanceStart":{"jquery":2000,"react":3000,"angular":3000}}
	);
};

describe('Directive:', function() {

	beforeEach(module("dashboardApp"));

	describe("template", function () {
		var $compile;
		var $scope;
		var model;
		var $httpBackend;
		var template;

		// Load the templates module
		beforeEach(module('templateUrl'));

		// Angular strips the underscores when injecting
		beforeEach(inject(function (_$compile_, _$rootScope_, dModel, _$httpBackend_, wwwRoot) {
			$compile = _$compile_;
			model = dModel.allCharts;
			$scope = _$rootScope_.$new();

			$httpBackend =_$httpBackend_;
			responses(_$httpBackend_, wwwRoot);

		}));

		beforeEach(function () {
			//angular.mock.inject(function ($injector) {
			//	$httpBackend = $injector.get('$httpBackend');
			//	responses($httpBackend);
			//})
		});

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		beforeEach(function() {
			$scope.model = model;

			// $compile the template, and pass in the $scope.
			// This will find your directive and run everything
			template = $compile("<dashboard-root db-model='{{model}}' />")($scope);

			//// Set some values on your $scope
			//$scope.header = "This is a header";
			//$scope.text = "Lorem Ipsum";
			//
			//// Now run a $digest cycle to update your template with new data
			$scope.$digest();

		});

		it("should render the header and text as passed in by $scope",
			inject(function () {
				$httpBackend.flush();
				//
				//// Render the template as a string
				var templateAsHtml = template.html();

				//
				//// Verify that the $scope variables are in the template
				expect(templateAsHtml).toContain('Prehled');

				//expect(templateAsHtml).toContain($scope.text);
				//
				//// Do it again with new values
				//var previousHeader = $scope.header;
				//var previousText = $scope.text;
				//$scope.header = "A completely different header";
				//$scope.text = "Something completely different";
				//
				//// Run the $digest cycle again
				//$scope.$digest();
				//
				//templateAsHtml = template.html();
				//
				//expect(templateAsHtml).toContain($scope.header);
				//expect(templateAsHtml).toContain($scope.text);
				//expect(templateAsHtml).toNotContain(previousHeader);
				//expect(templateAsHtml).toNotContain(previousText);

			}));
	});
});