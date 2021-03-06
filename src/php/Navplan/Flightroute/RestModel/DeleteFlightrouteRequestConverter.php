<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\UseCase\DeleteFlightroute\DeleteFlightrouteRequest;


class DeleteFlightrouteRequestConverter {
    const ARG_ID = "id";
    const ARG_TOKEN = "token";


    public static function fromArgs(array $args): DeleteFlightrouteRequest {
        return new DeleteFlightrouteRequest(
            StringNumberHelper::parseIntOrError($args, self::ARG_ID),
            StringNumberHelper::parseStringOrError($args, self::ARG_TOKEN)
        );
    }
}
