<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Service;

use Navplan\AerodromeChart\Domain\Model\UploadedChartInfo;
use Navplan\Common\Domain\Model\UploadedFileInfo;
use Navplan\System\Domain\Service\IFileService;


class AirportChartService implements IAirportChartService
{
    public function __construct(
        private IFileService $fileService
    )
    {
    }

    function uploadAdChart(UploadedFileInfo $fileInfo): UploadedChartInfo
    {
        // TODO: Implement uploadAdChart() method.
        return new UploadedChartInfo(
            $fileInfo->errorCode === UPLOAD_ERR_OK,
            $this->getMessage($fileInfo),
            $fileInfo->name,
            $fileInfo->type,
            $fileInfo->fullPath
        );
    }


    private function getMessage(UploadedFileInfo $fileInfo): string
    {
        return "Code: " . $fileInfo->errorCode
            . ", Name: " . $fileInfo->name
            . ", Type: " . $fileInfo->type
            . ", Size: " . $fileInfo->sizeBytes
            . ", tmpName: " . $fileInfo->tmpName
            . ", FullPath: " . $fileInfo->fullPath;
    }
}
