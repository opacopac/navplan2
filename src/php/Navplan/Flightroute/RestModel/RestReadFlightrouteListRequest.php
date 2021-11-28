<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Common\StringNumberHelper;


class RestReadFlightrouteListRequest {
    public function __construct(public string $token) {
    }


    public static function fromRest(array $args): RestReadFlightrouteListRequest {
        return new RestReadFlightrouteListRequest(
            StringNumberHelper::parseStringOrError($args, "token")
        );
    }
}
