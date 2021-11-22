<?php declare(strict_types=1);

namespace Navplan\Exporter\UseCase\ExportPdf;

use Navplan\Exporter\DomainService\IExportService;


class ExportPdfUc implements IExportPdfUc {
    public function __construct(private IExportService $exportService) {
    }


    public function exportPdf(ExportPdfRequest $request): ExportPdfResponse {
        $fileName = $this->exportService->createNavplanPdf(
            $request->flightroute,
            $request->fuelCalc,
            $request->fileName
        );

        return new ExportPdfResponse($fileName);
    }
}
