<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest\Converter;

use Navplan\Flightroute\Domain\Model\Flightroute;


class RestCreateSharedFlightrouteRequest {
    const ARG_CREATE_SHARED = "createShared";
    const ARG_ROUTE = "navplan";


    public function __construct(public Flightroute $flightroute) {
    }


    public static function fromRest(array $args): RestCreateSharedFlightrouteRequest {
        return new RestCreateSharedFlightrouteRequest(
            RestFlightrouteConverter::fromRest($args[self::ARG_ROUTE])
        );
    }
}
