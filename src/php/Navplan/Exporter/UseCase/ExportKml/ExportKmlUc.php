<?php declare(strict_types=1);

namespace Navplan\Exporter\UseCase\ExportKml;

use Navplan\Exporter\DomainModel\ExportFile;
use Navplan\Exporter\DomainService\IExportService;


class ExportKmlUc implements IExportKmlUc {
    public function __construct(private IExportService $exportService) {
    }


    public function exportKml(ExportKmlRequest $request): ExportFile {
        return $this->exportService->createNavplanKml(
            $request->flightroute,
            $request->track,
        );
    }
}
