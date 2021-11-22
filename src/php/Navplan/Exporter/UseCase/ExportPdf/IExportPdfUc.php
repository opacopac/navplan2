<?php declare(strict_types=1);

namespace Navplan\Exporter\UseCase\ExportPdf;


interface IExportPdfUc {
    public function exportPdf(ExportPdfRequest $request): ExportPdfResponse;
}
