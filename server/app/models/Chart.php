<?php

namespace Models;

/**
 * Načte data z json souboru a vrátí je controlerru.
 *
 * @author Petr Kukrál <p.kukral@kukral.eu>
 */
class Chart {

	/**
	 * Vrátí nastavení grafu ve formátu json
	 */
	public function getJsonSettings() {
		$settings = file_get_contents(DATA_DIR . '/Chart/data.json');

		$jsonSettings = json_decode($settings);

		return $jsonSettings;
	}

}
