<?php declare(strict_types=1);

namespace Navplan\Exporter;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Exporter\Domain\Service\IExportService;


interface IExporterDiContainer {
    function getExportController(): IRestController;

    function getExportService(): IExportService;
}
