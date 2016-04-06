<!DOCTYPE html>
<!--[if lt IE 7]>      <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--><html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Editace nastavení</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="js/bower_components/html5-boilerplate/dist/css/normalize.css">
	<link rel="stylesheet" href="js/bower_components/html5-boilerplate/dist/css/main.css">
	<link rel="stylesheet" href="css/app.css">
	<script src="js/bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js"></script>

	<!-- bootstrap -->
	<link href="js/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
	<link href="js/bower_components/bootstrap/dist/css/bootstrap-theme.min.css" rel="stylesheet">

	<!-- fonty -->
	<link href="//fonts.googleapis.com/css?family=Rationale" rel="stylesheet" type="text/css">

</head>
<body>
<!--[if lt IE 7]>
<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->



<!--<widget-base dbw-title="Samostatný widget bez použití dashboardu"><widget-clock format="HH:mm:ss" /></widget-base>-->

<div ng-app="editJsonApp"class="container">
	<div ng-controller="editController">
		<h1>Změna nastavení</h1>
		<p>Vyberte soubor pro editaci</p>
		<div class="btn-group" role="group" aria-label="...">
			<button ng-repeat="file in files" ng-click="loadFile(file)" type="button" class="btn btn-default">{{file.name}}</button>
		</div>
		<div>
			<form class="form">
				<textarea class="form-control" ng-model="file.content" ng-change="submitForm()" rows="25"></textarea>
			</form>
			<div ng-show="justSave" class="alert alert-warning alert-dismissible fade in">
				<strong>Uloženo</strong>
			</div>
		</div>
	</div>
</div>

<!-- jQuery -->
<script src="js/bower_components/jquery/dist/jquery.min.js"></script>

<script src="js/bower_components/angular/angular.js"></script>
<script src="js/bower_components/angular-route/angular-route.js"></script>
<script src="js/bower_components/angular-resource/angular-resource.js"></script>

<script src="js/app/app.js"></script>

<script>
	app.value('jsonFiles', [<?php echo $filesStr ?>]);
</script>

<!-- bootstrap -->
<script src="js/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script> <!--Zapne bootstrap tooltip pro vybrané prvky-->
	jQuery(function($) {
		$(document).tooltip({
			selector: '[data-toggle="tooltip"]'
		});
	});
</script>
</body>
</html>
