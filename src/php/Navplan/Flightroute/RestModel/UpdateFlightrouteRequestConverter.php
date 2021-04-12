<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Flightroute\UseCase\UpdateFlightroute\UpdateFlightrouteRequest;
use Navplan\Shared\StringNumberHelper;


class UpdateFlightrouteRequestConverter {
    public const ARG_TOKEN = "token";
    public const ARG_ROUTE = "navplan";


    public static function fromArgs(array $args): UpdateFlightrouteRequest {
        return new UpdateFlightrouteRequest(
            FlightrouteConverter::fromArgs($args[self::ARG_ROUTE]),
            StringNumberHelper::parseStringOrError($args, self::ARG_TOKEN)
        );
    }
}
