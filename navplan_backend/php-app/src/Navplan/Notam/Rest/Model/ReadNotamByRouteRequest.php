<?php declare(strict_types=1);

namespace Navplan\Notam\Rest\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\TimestampInterval;
use Navplan\Common\Rest\Converter\RestLengthConverter;
use Navplan\Common\Rest\Converter\RestTimestampIntervalConverter;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Rest\Converter\RestFlightrouteConverter;


class ReadNotamByRouteRequest {
    const ARG_FLIGHTROUTE = "flightroute";
    const ARG_MAX_DIST = "maxdist";


    public function __construct(
        public Flightroute $flightroute,
        public Length $maxDistFromRoute,
        public TimestampInterval $interval
    ) {
    }


    public static function fromRest(array $args): ReadNotamByRouteRequest {
        $flightroute = RestFlightrouteConverter::fromRest($args[self::ARG_FLIGHTROUTE]);
        $maxDistFromRoute = RestLengthConverter::fromRest($args[self::ARG_MAX_DIST]);

        return new ReadNotamByRouteRequest(
            $flightroute,
            $maxDistFromRoute,
            RestTimestampIntervalConverter::fromRest($args)
        );
    }
}
