'use strict';

var app = angular.module('editJsonApp', ['ngResource', 'ngRoute']);

var replaceAll = function(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
};
var replaceEndLine = function(content) {
  return replaceAll(content, "endline", '\n');
}


app.controller('editController', ['$scope', '$http', '$timeout', 'jsonFiles',  function($scope, $http, $timeout, jsonFiles) {
  $scope.hello = "ahoj";
  var files = [];
  $scope.justSave = false;

  $scope.files = jsonFiles;

  if(jsonFiles.length > 0) {
    var file = jsonFiles[0];
    file.content = replaceEndLine(file.content);
    $scope.file = file;
  }


  $scope.loadFile = function(file) {
    file.content = replaceEndLine(file.content);
    $scope.file = file;
  }

  $scope.submitForm = function() {
    console.log($scope.file);
    $http.post(window.location.pathname + '?save=true', $scope.file).success(function(){/*success callback*/});
    $scope.justSave = true;
    $timeout(function() {
      $scope.justSave = false;
    }, 1000);
  };

}]);