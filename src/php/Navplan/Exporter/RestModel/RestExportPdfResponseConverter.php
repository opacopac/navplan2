<?php declare(strict_types=1);

namespace Navplan\Exporter\RestModel;

use Navplan\Exporter\UseCase\ExportPdf\ExportPdfResponse;


class RestExportPdfResponseConverter {
    public static function toRest(ExportPdfResponse $response): array {
        return array(
            'pdffile' => $response->pdfFile
        );
    }
}
