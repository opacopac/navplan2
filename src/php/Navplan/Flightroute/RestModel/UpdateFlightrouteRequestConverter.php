<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\UseCase\UpdateFlightroute\UpdateFlightrouteRequest;


class UpdateFlightrouteRequestConverter {
    public const ARG_TOKEN = "token";
    public const ARG_ROUTE = "navplan";


    public static function fromArgs(array $args): UpdateFlightrouteRequest {
        return new UpdateFlightrouteRequest(
            RestFlightrouteConverter::fromRest($args[self::ARG_ROUTE]),
            StringNumberHelper::parseStringOrError($args, self::ARG_TOKEN)
        );
    }
}
