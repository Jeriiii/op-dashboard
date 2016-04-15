<?php

namespace Database;

/**
 * Vykonává operace nad databází
 *
 * @author Petr Kukrál <p.kukral@kukral.eu>
 */
class Database {

	/** @var Connection Informace k připojení k databázi */
	protected $connectio;

	public function __construct(Connection $connection) {
		$this->connectio = $connection;
	}

	/**
	 * Vykoná sql kód nad databází
	 * @param string $sql SQL kód, co se má vykonat
	 * @param array $params Parametry, které se mají vložit do sql kódu.
	 * @return PDOStatement|int Vybrané objekty | poslední vložené ID
	 */
	public function query($sql, $params = array(), $getLastInsertId = FALSE) {
		$params = is_string($params) ? array($params) : $params;
		$connect = $this->createConnection();

		/* vykonání příkazu i s ochranou proti SQL injection */
		$stmt = $connect->prepare($sql);
		$stmt->execute($params);

		if ($getLastInsertId) {
			$stmt = $connect->lastInsertId();
		}

		$connect = null; // ukončení spojení
		return $stmt;
	}

	/**
	 * Vytvoří nové spojení k databázi.
	 * @return \PDO
	 */
	private function createConnection() {
		$driver = $this->connectio->getDriver();
		$host = $this->connectio->getHost();
		$dbname = $this->connectio->getDbname();
		$user = $this->connectio->getUser();
		$password = $this->connectio->getPassword();

		$pdo = new PDO("$driver:host=$host;dbname=$dbname", $user, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		return $pdo;
	}

}
