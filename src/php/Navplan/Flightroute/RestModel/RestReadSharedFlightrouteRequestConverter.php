<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\UseCase\ReadSharedFlightroute\ReadSharedFlightrouteRequest;


class RestReadSharedFlightrouteRequestConverter {
    const ARG_SHARE_ID = "shareid";


    public static function fromArgs(array $args): ReadSharedFlightrouteRequest {
        return new ReadSharedFlightrouteRequest(
            StringNumberHelper::parseStringOrError($args, self::ARG_SHARE_ID)
        );
    }
}
