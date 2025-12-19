<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Service;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Length;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Notam\Domain\Model\Notam;


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
     * @param Flightroute $flightroute
     * @param Length $maxDistFromRoute
     * @param int $minNotamTimestamp
     * @param int $maxNotamTimestamp
     * @return Notam[]
     */
    function searchByRoute(Flightroute $flightroute, Length $maxDistFromRoute, int $minNotamTimestamp, int $maxNotamTimestamp): array;
}
