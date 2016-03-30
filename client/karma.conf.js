module.exports = function(config){
  config.set({
    preprocessors: {
                   'app/**/*.html': ['ng-html2js']
           },

           //ngHtml2JsPreprocessor: {
           //      // setting this option will create only a single module that contains templates
           //      // from all the files, so you can load them all with module('foo')
           //      moduleName: 'templateUrl'
           //  },


    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/jquery/dist/jquery.min.js',
      'app/bower_components/highcharts/highcharts.js',
      'app/bower_components/highcharts-ng/dist/highcharts-ng.js',

      'app/bower_components/ngReact/ngReact.js',
      'app/bower_components/react/react.js',
      'app/bower_components/react/react-dom.js',
      'app/bower_components/react/react-dom-server.js',
      'app/bower_components/react/react-with-addons.js',
      'app/dashboard/**/*.js',
      'app/dashboard/**/*.html',
      'app/view*/**/*.js'
    ],

    ngHtml2JsPreprocessor: {
      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      stripPrefix: "app/",

      moduleName: "templateUrl"
    },

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'

        //'karma-firefox-launcher',
        //'karma-ie-launcher',
        //'karma-safari-launcher',
        //'karma-opera-launcher',
        //'karma-phantomjs-launcher',
        //'karma-detect-browsers',
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
