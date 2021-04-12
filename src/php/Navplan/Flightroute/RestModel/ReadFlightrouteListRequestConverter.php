<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestModel;

use Navplan\Flightroute\UseCase\ReadFlightrouteList\ReadFlightrouteListRequest;
use Navplan\Shared\StringNumberHelper;


class ReadFlightrouteListRequestConverter {
    public static function fromArgs(array $args): ReadFlightrouteListRequest {
        return new ReadFlightrouteListRequest(
            StringNumberHelper::parseStringOrError($args, "token")
        );
    }
}
