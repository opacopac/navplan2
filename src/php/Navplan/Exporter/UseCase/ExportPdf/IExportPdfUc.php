<?php declare(strict_types=1);

namespace Navplan\Exporter\UseCase\ExportPdf;


use Navplan\Exporter\DomainModel\ExportFile;

interface IExportPdfUc {
    public function exportPdf(ExportPdfRequest $request): ExportFile;
}
