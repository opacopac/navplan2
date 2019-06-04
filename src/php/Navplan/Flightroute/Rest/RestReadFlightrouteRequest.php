<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest;

use Navplan\Flightroute\Domain\ReadFlightrouteRequest;
use Navplan\Shared\StringNumberService;


class RestReadFlightrouteRequest {
    const ARG_ID = "id";
    const ARG_TOKEN = "token";


    public static function fromArgs(array $args): ReadFlightrouteRequest {
        return new ReadFlightrouteRequest(
            StringNumberService::parseIntOrError($args, self::ARG_ID),
            StringNumberService::parseStringOrError($args, self::ARG_TOKEN)
        );
    }
}
