<?php declare(strict_types=1);

namespace Navplan\User\Rest;

use Navplan\Flightroute\Domain\CreateSharedFlightrouteRequest;
use Navplan\Flightroute\Rest\RestFlightroute;


class RestCreateSharedFlightrouteRequest {
    public static function fromArgs(array $args): CreateSharedFlightrouteRequest {
        return new CreateSharedFlightrouteRequest(
            RestFlightroute::fromArgs($args)
        );
    }
}
