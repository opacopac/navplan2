<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain\Query;

use Navplan\Flightroute\Domain\Model\Flightroute;


interface IFlightrouteListQuery
{
    /**
     * @param int $userId
     * @return Flightroute[]
     */
    function readList(int $userId): array;
}
