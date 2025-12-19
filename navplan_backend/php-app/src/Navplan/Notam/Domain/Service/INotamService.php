<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Service;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Length;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Notam\Domain\Model\Notam;


interface INotamService {
    /**
     * @param Flightroute $flightroute
     * @param Length $maxDistFromRoute
     * @param int $minNotamTimestamp
     * @param int $maxNotamTimestamp
     * @return Notam[]
     */
    function searchByRoute(Flightroute $flightroute, Length $maxDistFromRoute, int $minNotamTimestamp, int $maxNotamTimestamp): array;
}
