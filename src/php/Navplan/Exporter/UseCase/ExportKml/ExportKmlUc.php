<?php declare(strict_types=1);

namespace Navplan\Exporter\UseCase\ExportKml;

use Navplan\Exporter\DomainService\IExportService;


class ExportKmlUc implements IExportKmlUc {
    public function __construct(private IExportService $exportService) {
    }


    public function exportKml(ExportKmlRequest $request): ExportKmlResponse {
        $fileName = $this->exportService->createNavplanKml(
            $request->flightroute,
            $request->track,
            $request->fileName
        );

        return new ExportKmlResponse($fileName);
    }
}
