<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest;

use Navplan\Flightroute\Domain\ReadSharedFlightrouteRequest;
use Navplan\Shared\StringNumberHelper;


class RestReadSharedFlightrouteRequest {
    const ARG_SHARE_ID = "shareid";


    public static function fromArgs(array $args): ReadSharedFlightrouteRequest {
        return new ReadSharedFlightrouteRequest(
            StringNumberHelper::parseStringOrError($args, self::ARG_SHARE_ID)
        );
    }
}
