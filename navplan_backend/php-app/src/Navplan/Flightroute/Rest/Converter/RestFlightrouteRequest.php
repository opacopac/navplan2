<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest\Converter;

use Navplan\Flightroute\Domain\Model\Flightroute;


class RestFlightrouteRequest
{
    public const ARG_ROUTE = "navplan";


    public function __construct(
        public Flightroute $flightroute,
    )
    {
    }


    public static function fromRest(array $args): RestFlightrouteRequest
    {
        return new RestFlightrouteRequest(
            RestFlightrouteConverter::fromRest($args[self::ARG_ROUTE])
        );
    }
}
