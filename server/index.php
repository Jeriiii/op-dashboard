<?php

define('APP_DIR', __DIR__ . '/app');
define('DATA_DIR', __DIR__ . '/data');

require_once 'loader.php';
require_once APP_DIR . '/config/config.php';

use Controllers\DashboardSettingsGetterController;

$dsg = new DashboardSettingsGetterController();
if (array_key_exists('edit', $_GET)) {
	$dsg->editSettings();
} elseif (array_key_exists('save', $_GET)) {
	$dsg->saveSettings();
} else {
	$dsg->printSettings();
}


