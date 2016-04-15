<?php

namespace Models;

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
		$query = "SELECT * FROM " . $this->getTableName() . " WHERE type = ?";
		$stmt = $this->database->query($query, $type);
		return $stmt->fetch(PDO::FETCH_OBJ);
	}
}
