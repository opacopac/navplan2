<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\UseCase\CreateFlightroute\CreateFlightrouteRequest;


class CreateFlightrouteRequestConverter {
    public const ARG_TOKEN = "token";
    public const ARG_ROUTE = "navplan";


    public static function fromArgs(array $args): CreateFlightrouteRequest {
        return new CreateFlightrouteRequest(
            FlightrouteConverter::fromArgs($args[self::ARG_ROUTE]),
            StringNumberHelper::parseStringOrError($args, self::ARG_TOKEN)
        );
    }
}
