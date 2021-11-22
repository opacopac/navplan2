<?php declare(strict_types=1);

namespace Navplan\Exporter\UseCase\ExportPdf;


class ExportPdfResponse {
    public function __construct(public string $pdfUrl) {
    }
}
