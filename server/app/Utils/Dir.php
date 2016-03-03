<?php

/**
 * Stará se o složky
 *
 * @author Petr Kukrál <p.kukral@kukral.eu>
 */

class Dir {

	/** @var string Celá cesta k této složce */
	private $dirPath;

	/** @var array Názvy souborů ve složce */
	private $nameFillesInFolder = NULL;

	/** @var array Soubory ve složce */
	private $fillesInDir = NULL;

	public function __construct($dirPath) {
		$this->dirPath = $dirPath;
	}

	/**
	 * Nastaví pole názvů souborů ve složce.
	 * @param int $orderBy řazení ASC = 0, DESC = 1
	 * @param string $contains Vytřídí všechny soubory co v názvu neobsahují tento řetězec
	 */
	public function sortOutFilles($orderBy = 0, $contains = NULL) {
		$nameFiles = scandir($this->dirPath, $orderBy);

		/* odstraní všechny prvky pole co neobsahují řetězec */
		if ($contains && !empty($nameFiles)) {

			$nameFiles = Arrays::sortOut($nameFiles, $contains);
		}

		$this->nameFillesInFolder = $nameFiles;

		return $nameFiles;
	}

	/**
	 * Vrátí pole s obsahem souborů.
	 * @return array
	 */
	public function getFilles() {
		if ($this->nameFillesInFolder === NULL) {
			$this->sortOutFilles();
		}

		if ($this->fillesInDir === NULL) {
			$filles = array();

			foreach ($this->nameFillesInFolder as $key => $nameFile) {
				if($nameFile == '.' || $nameFile == '..') {
					unset($this->nameFillesInFolder[$key]);
				} else {
					$filles[$nameFile] = file_get_contents($this->dirPath . "/" . $nameFile);
				}
			}

			$this->fillesInDir = $filles;
		}

		return $filles;
	}

	public function __toString() {
		return $this->dirPath;
	}

}
