<?php

define('APP_DIR', __DIR__ . '/app');
define('DATA_DIR', __DIR__ . '/data');

require_once 'loader.php';

use Controllers\DashboardSettingsGetterController;

$dsg = new DashboardSettingsGetterController();
$dsg->printSettings();
