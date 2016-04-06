exports.config = {
	allScriptsTimeout: 11000,

	specs: [
		'*.js'
	],

	capabilities: {
		'browserName': 'chrome'
	},

	rootElement: '[ng-app]',

	baseUrl: 'http://localhost/skola/op/dashboard-op/client/app/',

	framework: 'jasmine',

	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000
	}
};