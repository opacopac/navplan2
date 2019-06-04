<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest;

use Navplan\Flightroute\Domain\CreateSharedFlightrouteRequest;
use Navplan\Flightroute\Rest\RestFlightroute;


class RestCreateSharedFlightrouteRequest {
    const ARG_CREATE_SHARED = "createShared";
    const ARG_ROUTE = "navplan";


    public static function fromArgs(array $args): CreateSharedFlightrouteRequest {
        return new CreateSharedFlightrouteRequest(
            RestFlightroute::fromArgs($args[self::ARG_ROUTE])
        );
    }
}
