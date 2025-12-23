<?php declare(strict_types=1);

namespace Navplan\Notam\Rest\Converter;

use Navplan\Common\Rest\Converter\RestLengthConverter;
use Navplan\Common\Rest\Converter\RestTimestampIntervalConverter;
use Navplan\Flightroute\Rest\Converter\RestFlightrouteConverter;
use Navplan\Notam\Domain\Service\NotamRouteRequest;


class RestNotamByRouteRequestConverter {
    const ARG_FLIGHTROUTE = "flightroute";
    const ARG_MAX_DIST = "maxdist";


    public static function fromRest(array $args): NotamRouteRequest {
        $flightroute = RestFlightrouteConverter::fromRest($args[self::ARG_FLIGHTROUTE]);
        $maxDistFromRoute = RestLengthConverter::fromRest($args[self::ARG_MAX_DIST]);

        return new NotamRouteRequest(
            $flightroute,
            $maxDistFromRoute,
            RestTimestampIntervalConverter::fromRest($args)
        );
    }
}
