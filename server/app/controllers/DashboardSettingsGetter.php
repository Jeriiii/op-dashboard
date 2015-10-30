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
		$chart = new Chart();

		$json = $chart->getJsonSettings();

		echo json_encode($json);
	}

}
