<?php declare(strict_types=1);

namespace Navplan\Exporter\UseCase\ExportPdf;

use Navplan\Flightroute\DomainModel\Flightroute;
use Navplan\Flightroute\DomainModel\FuelCalc;


class ExportPdfRequest {
    public function __construct(
        public Flightroute $flightroute,
        public FuelCalc $fuelCalc,
    ) {
    }
}
