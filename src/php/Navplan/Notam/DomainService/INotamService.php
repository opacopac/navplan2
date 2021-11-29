<?php declare(strict_types=1);

namespace Navplan\Notam\DomainService;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Notam\DomainModel\Notam;


interface INotamService {
    /**
     * @param Extent2d $extent
     * @param int $zoom
     * @param int $minNotamTimestamp
     * @param int $maxNotamTimestamp
     * @return Notam[]
     */
    function searchByExtent(Extent2d $extent, int $zoom, int $minNotamTimestamp, int $maxNotamTimestamp): array;

    /**
     * @param Position2d $position
     * @param int $minNotamTimestamp
     * @param int $maxNotamTimestamp
     * @return Notam[]
     */
    function searchByPosition(Position2d $position, int $minNotamTimestamp, int $maxNotamTimestamp): array;

    /**
     * @param string $airportIcao
     * @param int $minNotamTimestamp
     * @param int $maxNotamTimestamp
     * @return Notam[]
     */
    function searchByIcao(string $airportIcao, int $minNotamTimestamp, int $maxNotamTimestamp): array;
}
