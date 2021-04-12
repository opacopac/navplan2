<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Flightroute\UseCase\ReadFlightroute\ReadFlightrouteRequest;
use Navplan\Shared\StringNumberHelper;


class ReadFlightrouteRequestConverter {
    const ARG_ID = "id";
    const ARG_TOKEN = "token";


    public static function fromArgs(array $args): ReadFlightrouteRequest {
        return new ReadFlightrouteRequest(
            StringNumberHelper::parseIntOrError($args, self::ARG_ID),
            StringNumberHelper::parseStringOrError($args, self::ARG_TOKEN)
        );
    }
}
