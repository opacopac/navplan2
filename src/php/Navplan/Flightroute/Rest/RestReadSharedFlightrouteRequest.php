<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest;

use Navplan\Flightroute\Domain\ReadSharedFlightrouteRequest;
use Navplan\Shared\StringNumberService;


class RestReadSharedFlightrouteRequest {
    const ARG_SHARE_ID = "shareid";


    public static function fromArgs(array $args): ReadSharedFlightrouteRequest {
        return new ReadSharedFlightrouteRequest(
            StringNumberService::parseStringOrError($args, self::ARG_SHARE_ID)
        );
    }
}
