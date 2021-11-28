<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;


use Navplan\Common\StringNumberHelper;

class RestReadSharedFlightrouteRequest {
    const ARG_SHARE_ID = "shareid";


    public function __construct(public string $shareId) {
    }


    public static function fromRest(array $args): RestReadSharedFlightrouteRequest {
        return new RestReadSharedFlightrouteRequest(
            StringNumberHelper::parseStringOrError($args, self::ARG_SHARE_ID)
        );
    }
}
