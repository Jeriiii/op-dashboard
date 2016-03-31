'use strict';

describe('dashboardApp module', function() {

	beforeEach(module('dashboardApp'));

	var scope, viewCtrl;

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		viewCtrl = $controller('dashboardView3Ctrl', {$scope: scope});
	}));

	describe('view3 controller', function(){

		it('should have heading', inject(function($controller) {
			expect(viewCtrl).toBeDefined();
		}));

	});
});