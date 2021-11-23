<?php declare(strict_types=1);

namespace Navplan\Exporter\RestModel;

use Navplan\Exporter\UseCase\ExportKml\ExportKmlResponse;


class RestExportKmlResponseConverter {
    public static function toRest(ExportKmlResponse $response): array {
        return array(
            'kmlfile' => $response->kmlFile
        );
    }
}
