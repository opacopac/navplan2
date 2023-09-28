<?php declare(strict_types=1);

namespace Navplan\Exporter\Rest\Converter;

use Navplan\Exporter\Domain\Model\ExportFile;


class RestExportFileConverter {
    public static function toRest(ExportFile $exportFile): array {
        return array(
            'filename' => $exportFile->filename,
            'relurl' => $exportFile->relUrl,
            'mimetype' => $exportFile->mimeType
        );
    }
}
