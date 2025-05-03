<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Model;


class OriginalFileParameters
{
    public function __construct(
        public string $importFilename,
        public string $importChecksum,
        public ?PdfParameters $pdfParameters,
    )
    {
    }
}
