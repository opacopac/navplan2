<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;


class UploadedFileInfo
{
    public function __construct(
        public string $name,
        public string $type,
        public int $sizeBytes,
        public string $tmpName,
        public int $errorCode,
        public string $fullPath,
    )
    {
    }
}
