<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Flightroute\Domain\ReadFlightrouteRequest;
use Navplan\Shared\StringNumberService;


class RestReadFlightrouteRequest {
    public static function fromArgs(array $args): ReadFlightrouteRequest {
        return new ReadFlightrouteRequest(
            StringNumberService::parseIntOrError($args, "id"),
            StringNumberService::parseStringOrError($args, "token")
        );
    }
}
