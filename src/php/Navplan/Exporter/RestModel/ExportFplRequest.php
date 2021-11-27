<?php declare(strict_types=1);

namespace Navplan\Exporter\RestModel;

use Navplan\Flightroute\DomainModel\Flightroute;
use Navplan\Flightroute\RestModel\RestFlightrouteConverter;


class ExportFplRequest {
    const ARG_FLIGHTROUTE = "flightroute";


    public function __construct(
        public Flightroute $flightroute
    ) {
    }


    public static function fromRest(array $args): ExportFplRequest {
        return new ExportFplRequest(
            RestFlightrouteConverter::fromRest($args[self::ARG_FLIGHTROUTE])
        );
    }
}
