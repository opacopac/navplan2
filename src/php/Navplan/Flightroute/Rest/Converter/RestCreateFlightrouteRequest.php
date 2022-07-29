<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest\Converter;

use Navplan\Common\StringNumberHelper;
use Navplan\Flightroute\Domain\Model\Flightroute;


class RestCreateFlightrouteRequest {
    public const ARG_TOKEN = "token";
    public const ARG_ROUTE = "navplan";


    public function __construct(
        public Flightroute $flightroute,
        public string $token
    ) {
    }


    public static function fromRest(array $args): RestCreateFlightrouteRequest {
        return new RestCreateFlightrouteRequest(
            RestFlightrouteConverter::fromRest($args[self::ARG_ROUTE]),
            StringNumberHelper::parseStringOrError($args, self::ARG_TOKEN)
        );
    }
}
