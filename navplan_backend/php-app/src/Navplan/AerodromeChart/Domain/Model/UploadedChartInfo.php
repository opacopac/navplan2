<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Model;


class UploadedChartInfo
{
    public function __construct(
        public bool $success,
        public string $message,
        public string $originalFileName,
        public string $originalFileType,
        public string $chartUrl,
        public string $chartNameProposal,
        public int $scaleProposal
    )
    {
    }


    public static function createError(string $message): UploadedChartInfo
    {
        return new UploadedChartInfo(false, $message, "", "", "", "", 0);
    }
}
