<?php declare(strict_types=1);

namespace Navplan\Exporter\Rest\Converter;

use Navplan\Flightroute\DomainModel\Flightroute;
use Navplan\Flightroute\DomainModel\FuelCalc;
use Navplan\Flightroute\RestModel\RestFlightrouteConverter;
use Navplan\Flightroute\RestModel\RestFuelCalcConverter;


class RestExportExcelRequest {
    const ARG_FLIGHTROUTE = "flightroute";
    const ARG_FUELCALC = "fuelcalc";


    public function __construct(
        public Flightroute $flightroute,
        public FuelCalc $fuelCalc,
    ) {
    }


    public static function fromRest(array $args): RestExportExcelRequest {
        $flightRoute = RestFlightrouteConverter::fromRest($args[self::ARG_FLIGHTROUTE]);
        $fuelCalc = RestFuelCalcConverter::fromRest($args[self::ARG_FUELCALC]);

        return new RestExportExcelRequest(
            $flightRoute,
            $fuelCalc,
        );
    }
}
