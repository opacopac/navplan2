<?php declare(strict_types=1);

namespace Navplan\Exporter\Domain\Model;


class ExportFile {
    public function __construct(
        public string $filename,
        public string $relUrl,
        public string $mimeType,
    ) {
    }
}
