<?php declare(strict_types=1);

namespace Navplan\Notam\Rest\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Rest\Converter\RestLengthConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Rest\Converter\RestFlightrouteConverter;


class ReadNotamByRouteRequest {
    const ARG_FLIGHTROUTE = "flightroute";
    const ARG_MAX_DIST = "maxdist";
    const ARG_MIN_NOTAM_TIME = "starttimestamp";
    const ARG_MAX_NOTAM_TIME = "endtimestamp";


    public function __construct(
        public Flightroute $flightroute,
        public Length $maxDistFromRoute,
        public int $minNotamTimestamp,
        public int $maxNotamTimestamp
    ) {
    }


    public static function fromRest(array $args): ReadNotamByRouteRequest {
        $flightroute = RestFlightrouteConverter::fromRest($args[self::ARG_FLIGHTROUTE]);
        $maxDistFromRoute = RestLengthConverter::fromRest($args[self::ARG_MAX_DIST]);
        $minNotamTimestamp = StringNumberHelper::parseIntOrError($args, self::ARG_MIN_NOTAM_TIME);
        $maxNotamTimestamp = StringNumberHelper::parseIntOrError($args, self::ARG_MAX_NOTAM_TIME);

        return new ReadNotamByRouteRequest(
            $flightroute,
            $maxDistFromRoute,
            $minNotamTimestamp,
            $maxNotamTimestamp
        );
    }
}
