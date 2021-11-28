<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Common\StringNumberHelper;


class RestDeleteFlightrouteRequest {
    const ARG_ID = "id";
    const ARG_TOKEN = "token";


    public function __construct(
        public int $flightrouteId,
        public string $token
    ) {
    }


    public static function fromRest(array $args): RestDeleteFlightrouteRequest {
        return new RestDeleteFlightrouteRequest(
            StringNumberHelper::parseIntOrError($args, self::ARG_ID),
            StringNumberHelper::parseStringOrError($args, self::ARG_TOKEN)
        );
    }
}
