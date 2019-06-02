<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Flightroute\Domain\ReadSharedFlightrouteRequest;
use Navplan\Shared\StringNumberService;


class RestReadSharedFlightrouteRequest {
    public static function fromArgs(array $args): ReadSharedFlightrouteRequest {
        return new ReadSharedFlightrouteRequest(
            StringNumberService::parseStringOrError($args, "shareid")
        );
    }
}
