// Sloupcový graf React

var helloDirective = function(reactDirective) {
  return reactDirective('BarchartReact', ['fname', 'lname']);
};
helloDirective.$inject = ['reactDirective'];
dashboardApp.directive('barchartReact', helloDirective);
