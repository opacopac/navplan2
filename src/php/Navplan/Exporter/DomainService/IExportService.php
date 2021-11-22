<?php declare(strict_types=1);

namespace Navplan\Exporter\DomainService;

use Navplan\Flightroute\DomainModel\Flightroute;
use Navplan\Flightroute\DomainModel\FuelCalc;
use Navplan\Track\DomainModel\Track;


interface IExportService {
    function createNavplanPdf(Flightroute $flightroute, FuelCalc $fuelCalc, string $fileName): string;

    function createNavplanKml(Flightroute $flightroute, Track $track, string $fileName): string;
}
