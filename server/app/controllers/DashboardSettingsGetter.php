<?php

namespace Controllers;

use Models\Chart;

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

		switch ($type) {
			case 'hightchart':
			$this->printHightchartSettings();
			break;

			case 'linechart':
				$this->printLinechartSettings();
				break;

			case 'barchart':
				$this->printBarchartSettings();
				break;
			case 'barchart-test':
				$this->printBarchartTestSettings();
				break;
			case 'barchart-another':
				$this->printBarchartAnotherSettings();
				break;

			case 'pie':
				$this->printPieSettings();
				break;

			default:
				echo "Settings for chart type $type not found";
				break;
		}
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
	 * Vytiskne nastavení pro Hightchart grafy.
	 */
	private function printHightchartSettings() {
		$chart = new Chart();

		$json = $chart->getHightchartSettings();

		echo json_encode($json);
	}

	/**
	 * Vytiskne nastavení spojnicového grafu
	 */
	private function printLinechartSettings() {
		$chart = new Chart();

		$json = $chart->getLinechartSettings();

		echo json_encode($json);
	}

	/**
	 * Vytiskne nastavení sloupcového grafu
	 */
	private function printBarchartSettings() {
		$chart = new Chart();

		$json = $chart->getBarchartSettings();

		echo json_encode($json);
	}

	/**
	 * Vytiskne nastavení sloupcového grafu
	 */
	private function printBarchartTestSettings() {
		$chart = new Chart();

		$json = $chart->getBarchartTestSettings();

		echo json_encode($json);
	}

	/**
	 * Vytiskne další nastavení sloupcového grafu
	 */
	private function printBarchartAnotherSettings() {
		$chart = new Chart();

		$json = $chart->getBarchartAnotherSettings();

		echo json_encode($json);
	}

	/**
	 * Vytiskne nastavení koláčového grafu
	 */
	private function printPieSettings() {
		$chart = new Chart();

		$json = $chart->getPieSettings();

		echo json_encode($json);
	}

}
