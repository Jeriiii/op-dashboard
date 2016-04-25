<?php

namespace Models;

use PDO;

/**
 * Načte data z databáze a vrátí je controlerru.
 *
 * @author Petr Kukrál <p.kukral@kukral.eu>
 */
class ChartDao extends AbstractDao implements IChart {


	/**
	 * Vrátí nastavení daného grafu podle typu.
	 * @return string Nastavení daného grafu.
	 */
	public function getByType($type)
	{
		$query = "SELECT * FROM widgets WHERE type = ?";
		$stmt = $this->database->query($query, $type);
		$row = $stmt->fetch(PDO::FETCH_OBJ);

		if(!empty($row)) {
			$settings = $row->settings;
			return json_decode($settings);
		}

		return 'Data typu ' + $type + ' nebyla nalezena';
	}
}
