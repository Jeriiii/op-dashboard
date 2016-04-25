<?php

namespace Models;

/**
 * Načte data z json souboru a vrátí je controlerru.
 *
 * @author Petr Kukrál <p.kukral@kukral.eu>
 */
class Chart implements IChart{

	/**
	 * Vrátí nastavení daného grafu podle typu.
	 * @param $type Typ daného grafu
	 * @return string Nastavení daného grafu.
	 */
	public function getByType($type)
	{
		return $this->getSettings($type . '.json');
	}

	/**
	 * Vrátí nastavení grafu ve formátu json
	 * @param $file Soubor s nastavením, které se má vrátit
	 * @return string Nastavení daného grafu.
	 */
	private function getSettings($file) {
		$filePath = DATA_DIR . '/Chart/' . $file;

		if(!file_exists($filePath)) {
			return 'Soubor ' + $file + ' nebyl nalezen.';
		}

		$settings = file_get_contents($filePath);
		$jsonSettings = json_decode($settings);

		return $jsonSettings;
	}


}
