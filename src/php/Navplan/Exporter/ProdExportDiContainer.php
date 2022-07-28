<?php declare(strict_types=1);

namespace Navplan\Exporter;

use Navplan\Exporter\Builder\NavplanExcelBuilder;
use Navplan\Exporter\Builder\NavplanFplBuilder;
use Navplan\Exporter\Builder\NavplanGpxBuilder;
use Navplan\Exporter\Builder\NavplanKmlBuilder;
use Navplan\Exporter\Builder\NavplanPdfBuilder;
use Navplan\Exporter\DomainService\IExportService;
use Navplan\Exporter\FileExportService\FileExportService;
use Navplan\System\DomainService\IFileService;


class ProdExportDiContainer implements IExporterDiContainer {
    private IExportService $exportService;


    public function __construct(
        private IFileService $fileService
    ) {
    }


    function getExportService(): IExportService {
        if (!isset($this->exportService)) {
            $this->exportService = new FileExportService(
                $this->fileService,
                new NavplanPdfBuilder(),
                new NavplanKmlBuilder(),
                new NavplanGpxBuilder(),
                new NavplanFplBuilder(),
                new NavplanExcelBuilder()
            );
        }

        return $this->exportService;
    }
}
