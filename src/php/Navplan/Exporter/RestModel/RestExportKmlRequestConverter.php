<?php declare(strict_types=1);

namespace Navplan\Exporter\RestModel;

use Navplan\Common\StringNumberHelper;
use Navplan\Exporter\UseCase\ExportKml\ExportKmlRequest;
use Navplan\Flightroute\RestModel\RestFlightrouteConverter;
use Navplan\Track\RestModel\RestTrackConverter;


class RestExportKmlRequestConverter {
    const ARG_FLIGHTROUTE = "flightroute";
    const ARG_TRACK = "track";
    const ARG_FILENAME = "filename";


    public static function fromRest(array $args): ExportKmlRequest {
        $fileName = StringNumberHelper::parseStringOrError($args, self::ARG_FILENAME);
        $flightRoute = RestFlightrouteConverter::fromRest($args[self::ARG_FLIGHTROUTE]);
        $track = RestTrackConverter::fromRest($args[self::ARG_TRACK]);

        return new ExportKmlRequest(
            $flightRoute,
            $track,
            $fileName
        );
    }
}
