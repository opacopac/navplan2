<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest;

use Navplan\Flightroute\Domain\CreateFlightrouteRequest;
use Navplan\Shared\StringNumberService;


class RestCreateFlightrouteRequest {
    public const ARG_TOKEN = "token";
    public const ARG_ROUTE = "navplan";


    public static function fromArgs(array $args): CreateFlightrouteRequest {
        return new CreateFlightrouteRequest(
            RestFlightroute::fromArgs($args[self::ARG_ROUTE]),
            StringNumberService::parseStringOrError($args, self::ARG_TOKEN)
        );
    }
}
