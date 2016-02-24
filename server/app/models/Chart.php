<?php

namespace Models;

/**
 * Načte data z json souboru a vrátí je controlerru.
 *
 * @author Petr Kukrál <p.kukral@kukral.eu>
 */
class Chart {

	/**
	 * Vrátí nastavení hightchart grafu ve formátu json
	 */
	public function getHightchartSettings() {
		return $this->getSettings('hightchart.json');
	}

	/**
	 * Vrátí nastavení linechart grafu ve formátu json
	 */
	public function getLinechartSettings() {
		return $this->getSettings('linechart.json');
	}

	/**
	 * Vrátí nastavení barchart grafu ve formátu json
	 */
	public function getBarchartSettings() {
		return $this->getSettings('barchart.json');
	}

	/**
	 * Vrátí nastavení barchart grafu ve formátu json
	 */
	public function getBarchartTestSettings() {
		return $this->getSettings('barchart-test.json');
	}

	/**
	 * Vrátí další (odlišné) nastavení barchart grafu ve formátu json
	 */
	public function getBarchartAnotherSettings() {
		return $this->getSettings('barchart-another.json');
	}

	/**
	 * Vrátí nastavení pie grafu ve formátu json
	 */
	public function getPieSettings() {
		return $this->getSettings('pie.json');
	}

	/**
	 * Vrátí nastavení grafu ve formátu json
	 */
	private function getSettings($file) {
		$settings = file_get_contents(DATA_DIR . '/Chart/' . $file);

		$jsonSettings = json_decode($settings);

		return $jsonSettings;
	}

}
