<?php declare(strict_types=1);

namespace Navplan\Exporter\UseCase\ExportKml;


interface IExportKmlUc {
    public function exportKml(ExportKmlRequest $request): ExportKmlResponse;
}
