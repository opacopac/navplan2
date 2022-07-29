<?php declare(strict_types=1);

namespace Navplan\Exporter\Domain\Service;

use Navplan\Exporter\Domain\Model\ExportFile;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Flightroute\Domain\Model\FuelCalc;
use Navplan\Track\DomainModel\Track;


interface IExportService {
    function createNavplanPdf(Flightroute $flightroute, FuelCalc $fuelCalc): ExportFile;

    function createNavplanExcel(Flightroute $flightroute, FuelCalc $fuelCalc): ExportFile;

    function createNavplanKml(Flightroute $flightroute, Track $track): ExportFile;

    function createNavplanGpx(Flightroute $flightroute, Track $track): ExportFile;

    function createNavplanFpl(Flightroute $flightroute): ExportFile;
}
