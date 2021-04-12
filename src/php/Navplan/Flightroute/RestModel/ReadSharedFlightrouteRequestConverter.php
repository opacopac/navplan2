<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Flightroute\UseCase\ReadSharedFlightroute\ReadSharedFlightrouteRequest;
use Navplan\Shared\StringNumberHelper;


class ReadSharedFlightrouteRequestConverter {
    const ARG_SHARE_ID = "shareid";


    public static function fromArgs(array $args): ReadSharedFlightrouteRequest {
        return new ReadSharedFlightrouteRequest(
            StringNumberHelper::parseStringOrError($args, self::ARG_SHARE_ID)
        );
    }
}
