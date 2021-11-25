<?php declare(strict_types=1);

namespace Navplan\Exporter\RestModel;

use Navplan\Exporter\UseCase\ExportPdf\ExportPdfRequest;
use Navplan\Flightroute\RestModel\RestFlightrouteConverter;
use Navplan\Flightroute\RestModel\RestFuelCalcConverter;


class RestExportPdfRequestConverter {
    const ARG_FLIGHTROUTE = "flightroute";
    const ARG_FUELCALC = "fuelcalc";


    public static function fromRest(array $args): ExportPdfRequest {
        $flightRoute = RestFlightrouteConverter::fromRest($args[self::ARG_FLIGHTROUTE]);
        $fuelCalc = RestFuelCalcConverter::fromRest($args[self::ARG_FUELCALC]);

        return new ExportPdfRequest(
            $flightRoute,
            $fuelCalc,
        );
    }
}
