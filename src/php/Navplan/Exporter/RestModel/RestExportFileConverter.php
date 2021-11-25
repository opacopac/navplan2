<?php declare(strict_types=1);

namespace Navplan\Exporter\RestModel;

use Navplan\Exporter\DomainModel\ExportFile;


class RestExportFileConverter {
    public static function toRest(ExportFile $exportFile): array {
        return array(
            'filename' => $exportFile->filename,
            'relurl' => $exportFile->relUrl,
        );
    }
}
