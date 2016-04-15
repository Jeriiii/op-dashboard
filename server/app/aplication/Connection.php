<?php

namespace Database;

/**
 * Přepravka pro připojení k databázi
 *
 * @author Petr Kukrál <p.kukral@kukral.eu>
 */
class Connection {
	/* údaje o připojení do DB */

	private $driver;
	private $host;
	private $dbname;
	private $user;
	private $password;

	public function __construct($driver, $host, $dbname, $user, $password) {
		$this->driver = $driver;
		$this->host = $host;
		$this->dbname = $dbname;
		$this->user = $user;
		$this->password = $password;
	}

	public function getDriver() {
		return $this->driver;
	}

	public function getHost() {
		return $this->host;
	}

	public function getDbname() {
		return $this->dbname;
	}

	public function getUser() {
		return $this->user;
	}

	public function getPassword() {
		return $this->password;
	}

}
