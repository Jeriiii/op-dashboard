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
		when('/view3', {
			templateUrl: 'view3/view3.html',
			controller: 'dashboardView3Ctrl'
		}).
		when('/view4', {
			templateUrl: 'view4/view4.html',
			controller: 'dashboardView4Ctrl'
		}).
		when('/view5', {
			templateUrl: 'view5/view5.html',
			controller: 'dashboardView5Ctrl'
		}).
		when('/view6', {
			templateUrl: 'view6/view6.html',
			controller: 'dashboardView6Ctrl'
		}).
		otherwise({
			redirectTo: '/view1'
		});
	}]);