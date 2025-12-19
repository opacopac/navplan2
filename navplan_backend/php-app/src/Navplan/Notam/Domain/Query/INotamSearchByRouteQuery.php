<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Query;

use Navplan\Common\Domain\Model\Length;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Notam\Domain\Model\Notam;


interface INotamSearchByRouteQuery
{
    /**
     * @param Flightroute $flightroute
     * @param Length $maxDistFromRoute
     * @param int $minNotamTimestamp
     * @param int $maxNotamTimestamp
     * @return Notam[]
     */
    function searchByRoute(Flightroute $flightroute, Length $maxDistFromRoute, int $minNotamTimestamp, int $maxNotamTimestamp): array;
}
