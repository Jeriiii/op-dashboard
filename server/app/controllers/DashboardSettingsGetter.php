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

			case 'pie':
				$this->printPieSettings();
				break;

			default:
				echo "Settings for chart type $type not found";
				break;
		}
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
	 * Vytiskne nastavení koláčového grafu
	 */
	private function printPieSettings() {
		$chart = new Chart();

		$json = $chart->getPieSettings();

		echo json_encode($json);
	}

}
