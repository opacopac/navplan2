<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Flightroute\Domain\DeleteFlightrouteRequest;
use Navplan\Shared\StringNumberService;


class RestDeleteFlightrouteRequest {
    public static function fromArgs(array $args): DeleteFlightrouteRequest {
        return new DeleteFlightrouteRequest(
            StringNumberService::parseIntOrError($args, "id"),
            StringNumberService::parseStringOrError($args, "token")
        );
    }
}
