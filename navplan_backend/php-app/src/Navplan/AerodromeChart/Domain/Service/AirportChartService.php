<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Service;

use Navplan\AerodromeChart\Domain\Model\UploadedChartInfo;
use Navplan\Common\Domain\Model\Angle;
use Navplan\Common\Domain\Model\UploadedFileInfo;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IImageService;


class AirportChartService implements IAirportChartService
{
    public function __construct(
        private IFileService  $fileService,
        private IImageService $imageService
    )
    {
    }

    function uploadAdChart(UploadedFileInfo $fileInfo): UploadedChartInfo
    {
        if ($fileInfo->errorCode !== UPLOAD_ERR_OK) {
            return new UploadedChartInfo(
                false,
                $fileInfo->getErrorMessage(),
                "",
                "",
                ""
            );
        }

        switch ($fileInfo->type) {
            case "image/png":
            case "image/jpeg":
            case "image/jpg":
                $img = $this->imageService->loadImage($fileInfo->tmpName);
                break;
            case "application/pdf":
                $img = $this->imageService->loadPdf($fileInfo->tmpName, 200, 0, Angle::fromDeg(0));
                break;
            default:
                return new UploadedChartInfo(false, "invalid file type", "", "", "");
        }

        $filename = "chart.png";
        $tmpDir = $this->fileService->createTempDir();
        $targetFile = $this->fileService->getTempDirBase() . $tmpDir . "/" . $filename;
        $img->saveImage($targetFile);
        /*$moveSuccess = $this->fileService->moveUploadedFile($fileInfo->tmpName, $targetFile);

        if (!$moveSuccess) {
            return new UploadedChartInfo(false, "could not move uploaded file", "", "", "");
        }*/

        return new UploadedChartInfo(
            true,
            $this->getMessage($fileInfo),
            $filename,
            $fileInfo->type,
            $tmpDir . "/" . $filename
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
