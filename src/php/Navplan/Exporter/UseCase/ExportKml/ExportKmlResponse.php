<?php declare(strict_types=1);

namespace Navplan\Exporter\UseCase\ExportKml;


class ExportKmlResponse {
    public function __construct(public string $kmlFile) {
    }
}
