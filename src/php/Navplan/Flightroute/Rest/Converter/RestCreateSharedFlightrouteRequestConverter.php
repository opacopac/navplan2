<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest\Converter;

use Navplan\Flightroute\UseCase\CreateSharedFlightroute\CreateSharedFlightrouteRequest;


class RestCreateSharedFlightrouteRequestConverter {
    const ARG_CREATE_SHARED = "createShared";
    const ARG_ROUTE = "navplan";


    public static function fromArgs(array $args): CreateSharedFlightrouteRequest {
        return new CreateSharedFlightrouteRequest(
            RestFlightrouteConverter::fromRest($args[self::ARG_ROUTE])
        );
    }
}
