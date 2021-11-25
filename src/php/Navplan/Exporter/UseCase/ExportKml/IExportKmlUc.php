<?php declare(strict_types=1);

namespace Navplan\Exporter\UseCase\ExportKml;

use Navplan\Exporter\DomainModel\ExportFile;


interface IExportKmlUc {
    public function exportKml(ExportKmlRequest $request): ExportFile;
}
