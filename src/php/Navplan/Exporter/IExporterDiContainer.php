<?php declare(strict_types=1);

namespace Navplan\Exporter;

use Navplan\Exporter\DomainService\IExportService;


interface IExporterDiContainer {
    function getExportService(): IExportService;
}
