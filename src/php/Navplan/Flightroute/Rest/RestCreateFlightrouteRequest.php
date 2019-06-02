<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Flightroute\Domain\CreateFlightrouteRequest;
use Navplan\Flightroute\Rest\RestFlightroute;
use Navplan\Shared\StringNumberService;


class RestCreateFlightrouteRequest {
    public static function fromArgs(array $args): CreateFlightrouteRequest {
        return new CreateFlightrouteRequest(
            RestFlightroute::fromArgs($args),
            StringNumberService::parseStringOrError($args, "token")
        );
    }
}
