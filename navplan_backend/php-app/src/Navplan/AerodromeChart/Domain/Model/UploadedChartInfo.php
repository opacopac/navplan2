<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Model;


class UploadedChartInfo
{
    public function __construct(
        public bool $success,
        public string $message,
        public string $filename,
        public string $type,
        public string $url,
    )
    {
    }
}
