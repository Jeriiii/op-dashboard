<?php

namespace Controllers;

use Models\Chart;

/**
 * Vrátí nastavení celého dashboardu ve formátu json
 *
 * @author Petr Kukrál <p.kukral@kukral.eu>
 */
class DashboardSettingsGetterController {

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

			default:
				echo "Settings for chart type $type not found";
				break;
		}
	}

	private function printHightchartSettings() {
		$chart = new Chart();

		$json = $chart->getHightchartSettings();

		echo json_encode($json);
	}

	private function printLinechartSettings() {
		$chart = new Chart();

		$json = $chart->getLinechartSettings();

		echo json_encode($json);
	}

}
