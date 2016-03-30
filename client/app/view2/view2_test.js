'use strict';

describe('dashboardApp module', function() {

  beforeEach(module('dashboardApp'));

	var scope, view2Ctrl;

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		view2Ctrl = $controller('dashboardView2Ctrl', {$scope: scope});
	}));

  describe('view2 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      expect(view2Ctrl).toBeDefined();
    }));

  });
});