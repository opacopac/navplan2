<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the Exporter module.
 * Replaces the former ProdExportDiContainer.
 * IFileService, IHttpService are already provided by the System module's
 * definitions file.
 */

use Navplan\Exporter\Domain\Service\IExportService;
use Navplan\Exporter\FileExportService\FileExportService;
use Navplan\Exporter\Rest\Controller\ExporterController;
use function DI\autowire;

return [
    // NavplanPdfBuilder/KmlBuilder/GpxBuilder/FplBuilder/ExcelBuilder are
    // resolved automatically via autowiring (concrete, no-arg constructors).
    IExportService::class => autowire(FileExportService::class),

    // Bound to the CONCRETE class, not to the shared IRestController interface,
    // to avoid collisions with other modules' controller bindings.
    ExporterController::class => autowire(),
];

