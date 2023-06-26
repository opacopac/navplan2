<?php declare(strict_types=1);

namespace Navplan\Exporter;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Exporter\Builder\NavplanExcelBuilder;
use Navplan\Exporter\Builder\NavplanFplBuilder;
use Navplan\Exporter\Builder\NavplanGpxBuilder;
use Navplan\Exporter\Builder\NavplanKmlBuilder;
use Navplan\Exporter\Builder\NavplanPdfBuilder;
use Navplan\Exporter\Domain\Service\IExportService;
use Navplan\Exporter\FileExportService\FileExportService;
use Navplan\Exporter\Rest\Controller\ExporterController;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;


class ProdExportDiContainer implements IExporterDiContainer {
    private IRestController $exportController;
    private IExportService $exportService;


    public function __construct(
        private IFileService $fileService,
        private IHttpService $httpService
    ) {
    }


    public function getExportController(): IRestController {
        if (!isset($this->exportController)) {
            $this->exportController = new ExporterController(
                $this->getExportService(),
                $this->httpService
            );
        }

        return $this->exportController;
    }


    public function getExportService(): IExportService {
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
