/**
 * Created by Petr on 18.2.2016.
 */
// Declare app level module which depends on views, and components
//angular.module('dashboardApp', [
//	'ngRoute',
//	'dashboardApp.view1',
//	'dashboardApp.view2'
//]).
//config(['$routeProvider', function($routeProvider) {
//	$routeProvider.otherwise({redirectTo: '/view1'});
//}]);

dashboardApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/view1', {
			templateUrl: 'view1/view1.html',
			controller: 'dashboardView1Ctrl'
		}).
		when('/view2', {
			templateUrl: 'view2/view2.html',
			controller: 'dashboardView2Ctrl'
		}).
		otherwise({
			redirectTo: '/view1'
		});
	}]);