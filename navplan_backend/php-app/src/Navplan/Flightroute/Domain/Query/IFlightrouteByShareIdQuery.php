<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain\Query;

use Navplan\Flightroute\Domain\Model\Flightroute;


interface IFlightrouteByShareIdQuery {
    function readByShareId(string $shareId): ?Flightroute;
}
