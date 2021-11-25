<?php declare(strict_types=1);

namespace Navplan\Exporter\UseCase\ExportPdf;


use Navplan\Exporter\DomainModel\ExportFile;

class ExportPdfResponse {
    public function __construct(public ExportFile $exportFile) {
    }
}
