<?php declare(strict_types=1);

namespace Navplan\Exporter\RestService;

use Navplan\Exporter\UseCase\ExportPdf\IExportPdfUc;
use Navplan\System\DomainService\IHttpService;


interface IExporterServiceDiContainer {
    function getHttpService(): IHttpService;

    function getExportPdfUc(): IExportPdfUc;
}
