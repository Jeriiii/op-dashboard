<?php

namespace Controllers;

use Models\Chart;
use Database\Database;
use Database\Connection;

/**
 * Vrátí nastavení celého dashboardu ve formátu json
 *
 * @author Petr Kukrál <p.kukral@kukral.eu>
 */
class DashboardSettingsGetterController {

	/**
	 * Vytiskne na výstup nastavení konkrétního typu grafu.
	 */
	public function printSettings() {
		if (!array_key_exists('type', $_GET)) {
			echo 'You must fill parametr type';
			return;
		}

		$type = $_GET['type'];

		$this->printSettingsByType($type);
	}

	/**
	 * Uloží poslaný soubor
	 */
	public function saveSettings() {
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);

		$dirPath = DATA_DIR . '/Chart/';

		$file = fopen($dirPath . $request->name,"w");
		echo fwrite($file,$request->content);
		fclose($file);

		echo print_r($request);
	}

	/**
	 * Nahraje json soubory, které se mají editovat
	 */
	public function editSettings() {
		if (!array_key_exists('edit', $_GET)) {
			return;
		}

		$dirPath = DATA_DIR . '/Chart/';
		$dir = new \Dir($dirPath);
		$files = $dir->getFilles();

		foreach($files as $key => $file) {
			if($key == '.' || $key == '..') {
				unset($files[$key]);
			} else {
				$path = $dirPath . $key;
				$content = preg_replace("/\r\n|\r|\n/",'endline',$files[$key]);
				$files[$key] = "{name: '$key', path: '$path', content: '$content'}";
			}
		}

		$filesStr = implode(',', $files);

		include_once(__DIR__ . '/../view/editSettings.php');
	}

	/**
	 * Vrátí nastavení grafu podle jeho typu.
	 * @param string $type Typ daného grafu.
	 */
	private function printSettingsByType($type) {
		$chart = new Chart();

		$json = $chart->getByType($type);

		echo json_encode($json);
	}


}
