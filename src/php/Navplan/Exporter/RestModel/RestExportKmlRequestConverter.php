<?php declare(strict_types=1);

namespace Navplan\Exporter\RestModel;

use Navplan\Exporter\UseCase\ExportKml\ExportKmlRequest;
use Navplan\Flightroute\RestModel\RestFlightrouteConverter;
use Navplan\Track\RestModel\RestTrackConverter;


class RestExportKmlRequestConverter {
    const ARG_FLIGHTROUTE = "flightroute";
    const ARG_TRACK = "track";


    public static function fromRest(array $args): ExportKmlRequest {
        return new ExportKmlRequest(
            RestFlightrouteConverter::fromRest($args[self::ARG_FLIGHTROUTE]),
            RestTrackConverter::fromRest($args[self::ARG_TRACK])
        );
    }
}
