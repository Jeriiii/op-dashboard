'use strict';

describe('dashboardApp module', function() {

  beforeEach(module('dashboardApp'));

  var scope, view1Ctrl;

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    view1Ctrl = $controller('dashboardView1Ctrl', {$scope: scope});
  }));

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      expect(view1Ctrl).toBeDefined();
    }));

  });
});