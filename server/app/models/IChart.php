<?php
/**
 * Created by PhpStorm.
 * User: Petr
 * Date: 14.4.2016
 * Time: 16:47
 */

namespace Models;

/**
 * Interface IChart Slouží ke sjednocení modelů, které slouží pro vracení dat grafům.
 * @package Models
 */
interface IChart
{
	/**
	 * Vrátí nastavení daného grafu podle typu.
	 * @return string Nastavení daného grafu.
	 */
	public function getByType($type);

}