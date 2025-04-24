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
        if ($fileInfo->errorCode !== UPLOAD_ERR_OK) {
            return new UploadedChartInfo(
                false,
                "Upload error code: " . $fileInfo->errorCode,
                "",
                "",
                ""
            );
        }

        $tmpDir = $this->fileService->createTempDir();
        $destination = $this->fileService->getTempDirBase() . $tmpDir . "/" . $fileInfo->name;
        $moveSuccess = $this->fileService->moveUploadedFile($fileInfo->tmpName, $destination);

        if (!$moveSuccess) {
            return new UploadedChartInfo(false, "could not move uploaded file", "", "", "");
        }

        return new UploadedChartInfo(
            true,
            $this->getMessage($fileInfo),
            $fileInfo->name,
            $fileInfo->type,
            $tmpDir . "/" . $fileInfo->name
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
