<?php declare(strict_types=1);

namespace Navplan\Exporter\RestModel;

use Navplan\Flightroute\DomainModel\Flightroute;
use Navplan\Flightroute\RestModel\RestFlightrouteConverter;
use Navplan\Track\DomainModel\Track;
use Navplan\Track\RestModel\RestTrackConverter;


class RestExportKmlRequest {
    const ARG_FLIGHTROUTE = "flightroute";
    const ARG_TRACK = "track";


    public function __construct(
        public Flightroute $flightroute,
        public Track $track,
    ) {
    }


    public static function fromRest(array $args): RestExportKmlRequest {
        return new RestExportKmlRequest(
            RestFlightrouteConverter::fromRest($args[self::ARG_FLIGHTROUTE]),
            RestTrackConverter::fromRest($args[self::ARG_TRACK])
        );
    }
}
