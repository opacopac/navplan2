<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest;

use Navplan\Flightroute\Domain\DeleteFlightrouteRequest;
use Navplan\Shared\StringNumberService;


class RestDeleteFlightrouteRequest {
    const ARG_ID = "id";
    const ARG_TOKEN = "token";


    public static function fromArgs(array $args): DeleteFlightrouteRequest {
        return new DeleteFlightrouteRequest(
            StringNumberService::parseIntOrError($args, self::ARG_ID),
            StringNumberService::parseStringOrError($args, self::ARG_TOKEN)
        );
    }
}
