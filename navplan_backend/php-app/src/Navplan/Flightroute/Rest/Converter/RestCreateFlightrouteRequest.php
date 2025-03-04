<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest\Converter;

use Navplan\Flightroute\Domain\Model\Flightroute;


class RestCreateFlightrouteRequest
{
    public const ARG_ROUTE = "navplan";


    public function __construct(
        public Flightroute $flightroute,
    )
    {
    }


    public static function fromRest(array $args): RestCreateFlightrouteRequest
    {
        return new RestCreateFlightrouteRequest(
            RestFlightrouteConverter::fromRest($args[self::ARG_ROUTE])
        );
    }
}
