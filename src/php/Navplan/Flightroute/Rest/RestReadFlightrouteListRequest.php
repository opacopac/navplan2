<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest;

use Navplan\Flightroute\Domain\ReadFlightrouteListRequest;
use Navplan\Shared\StringNumberService;


class RestReadFlightrouteListRequest {
    public static function fromArgs(array $args): ReadFlightrouteListRequest {
        return new ReadFlightrouteListRequest(
            StringNumberService::parseStringOrError($args, "token")
        );
    }
}
