<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\UseCase\ReadFlightrouteList\ReadFlightrouteListRequest;


class ReadFlightrouteListRequestConverter {
    public static function fromArgs(array $args): ReadFlightrouteListRequest {
        return new ReadFlightrouteListRequest(
            StringNumberHelper::parseStringOrError($args, "token")
        );
    }
}
