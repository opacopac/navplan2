<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Flightroute\Domain\UpdateFlightrouteRequest;
use Navplan\Flightroute\Rest\RestFlightroute;
use Navplan\Shared\StringNumberService;


class RestUpdateFlightrouteRequest {
    public static function fromArgs(array $args): UpdateFlightrouteRequest {
        return new UpdateFlightrouteRequest(
            RestFlightroute::fromArgs($args),
            StringNumberService::parseStringOrError($args, "token")
        );
    }
}
