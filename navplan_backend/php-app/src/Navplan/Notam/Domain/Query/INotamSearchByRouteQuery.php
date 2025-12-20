<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Query;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\TimestampInterval;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Notam\Domain\Model\Notam;


interface INotamSearchByRouteQuery
{
    /**
     * @param Flightroute $flightroute
     * @param Length $maxDistFromRoute
     * @param TimestampInterval $interval
     * @return Notam[]
     */
    function searchByRoute(Flightroute $flightroute, Length $maxDistFromRoute, TimestampInterval $interval): array;
}
