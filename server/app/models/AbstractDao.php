<?php

namespace Models;

/**
 * AbstractDao
 *
 * @author Petr Kukrál <p.kukral@kukral.eu>
 */
class AbstractDao {

	/** @var Database Zastřešuje práci nad databází. */
	protected $database;

	public function __construct(Database $database) {
		$this->database = $database;
	}

	/**
	 * Vrátí všechny řádky z tabulky.
	 * @return array Pole s řádky.
	 */
	public function getAll() {
		$query = "SELECT * FROM " . $this->getTableName();
		$stmt = $this->database->query($query);
		return $this->stmtsToArray($stmt);
	}

	/**
	 * Vloží data do databáze.
	 * @param array $data Data které se mají vložit.
	 */
	public function insert(array $data) {
		$names = array();
		$values = array();
		foreach ($data as $name => $val) {
			$names[] = $name;
			$placeHolderValues[] = "?";
			$values[] = $val;
		}
		$query = "INSERT INTO " . $this->getTableName() . " (" . implode(",", $names) . ")" . " VALUES(" . implode(",", $placeHolderValues) . ");";
		$id = $this->database->query($query, $values, TRUE);
		return $this->findById($id);
	}

	/**
	 * Změní data v databázi.
	 * @param int $id Id stránky.
	 * @param array $data Data které se mají upravit.
	 */
	public function update($id, array $data) {
		$names = array();
		$values = array();
		foreach ($data as $name => $val) {
			$names[] = $name . '=' . "?";
			$values[] = $val;
		}
		$values[] = $id;
		$query = "UPDATE " . $this->getTableName() . " SET " . implode(",", $names) . " WHERE id = ?;";
		$this->database->query($query, $values);
	}

	/**
	 * Vloží vytažené objekty z databáze do pole, aby se dalo proiterovat.
	 * @param PDOStatement $stmts Objekty, které se mají vložit do pole.
	 * @return array Pole objektů vytažených z DB.
	 */
	protected function stmtsToArray($stmts) {
		$arrStmts = array();
		while ($stmt = $stmts->fetch(PDO::FETCH_OBJ)) {
			$arrStmts[] = $stmt;
		}
		return $arrStmts;
	}

	/**
	 * Smaže řádek podle jeho id
	 * @param int $id Id řádku.
	 */
	public function delete($id) {
		$query = "DELETE FROM " . $this->getTableName() . " WHERE id = ?";
		$this->database->query($query, $id);
	}

	/**
	 * Najde řádek podle Id.
	 * @param string $id Id řádku.
	 * @return PDOStatement|boolean Jeden řádek.
	 */
	public function findById($id) {
		$query = "SELECT * FROM " . $this->getTableName() . " WHERE id = ?";
		$stmt = $this->database->query($query, $id);
		return $stmt->fetch(PDO::FETCH_OBJ);
	}

}
