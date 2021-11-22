<?php declare(strict_types=1);

namespace Navplan\Exporter\RestModel;

use Navplan\Common\StringNumberHelper;
use Navplan\Exporter\UseCase\ExportPdf\ExportPdfRequest;
use Navplan\Flightroute\RestModel\RestFlightrouteConverter;
use Navplan\Flightroute\RestModel\RestFuelCalcConverter;


class RestExportPdfRequestConverter {
    const ARG_FLIGHTROUTE = "flightroute";
    const ARG_FUELCALC = "fuelcalc";
    const ARG_FILENAME = "filename";


    public static function fromRest(array $args): ExportPdfRequest {
        $fileName = StringNumberHelper::parseStringOrError($args, self::ARG_FILENAME);
        $flightRoute = RestFlightrouteConverter::fromRest($args[self::ARG_FLIGHTROUTE]);
        $fuelCalc = RestFuelCalcConverter::fromRest($args[self::ARG_FUELCALC]);

        return new ExportPdfRequest(
            $flightRoute,
            $fuelCalc,
            $fileName
        );
    }
}
