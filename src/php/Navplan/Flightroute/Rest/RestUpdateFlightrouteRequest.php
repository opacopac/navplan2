<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest;

use Navplan\Flightroute\Domain\UpdateFlightrouteRequest;
use Navplan\Shared\StringNumberHelper;


class RestUpdateFlightrouteRequest {
    public const ARG_TOKEN = "token";
    public const ARG_ROUTE = "navplan";


    public static function fromArgs(array $args): UpdateFlightrouteRequest {
        return new UpdateFlightrouteRequest(
            RestFlightroute::fromArgs($args[self::ARG_ROUTE]),
            StringNumberHelper::parseStringOrError($args, self::ARG_TOKEN)
        );
    }
}
