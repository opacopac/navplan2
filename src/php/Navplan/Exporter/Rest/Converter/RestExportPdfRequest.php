<?php declare(strict_types=1);

namespace Navplan\Exporter\Rest\Converter;

use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Domain\Model\FuelCalc;
use Navplan\Flightroute\Rest\Converter\RestFlightrouteConverter;
use Navplan\Flightroute\Rest\Converter\RestFuelCalcConverter;


class RestExportPdfRequest {
    const ARG_FLIGHTROUTE = "flightroute";
    const ARG_FUELCALC = "fuelcalc";


    public function __construct(
        public Flightroute $flightroute,
        public FuelCalc $fuelCalc,
    ) {
    }


    public static function fromRest(array $args): RestExportPdfRequest {
        $flightRoute = RestFlightrouteConverter::fromRest($args[self::ARG_FLIGHTROUTE]);
        $fuelCalc = RestFuelCalcConverter::fromRest($args[self::ARG_FUELCALC]);

        return new RestExportPdfRequest(
            $flightRoute,
            $fuelCalc,
        );
    }
}
