<?php declare(strict_types=1);

namespace Navplan\Exporter\Rest\Converter;

use Navplan\Flightroute\DomainModel\Flightroute;
use Navplan\Flightroute\RestModel\RestFlightrouteConverter;


class RestExportFplRequest {
    const ARG_FLIGHTROUTE = "flightroute";


    public function __construct(
        public Flightroute $flightroute
    ) {
    }


    public static function fromRest(array $args): RestExportFplRequest {
        return new RestExportFplRequest(
            RestFlightrouteConverter::fromRest($args[self::ARG_FLIGHTROUTE])
        );
    }
}
