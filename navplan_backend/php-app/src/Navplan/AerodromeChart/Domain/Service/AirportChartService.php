<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Service;

use Navplan\AerodromeChart\Domain\Model\UploadedChartInfo;
use Navplan\AerodromeChart\Domain\Model\UploadedPdfInfo;
use Navplan\Common\Domain\Model\UploadedFileInfo;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IImageService;


// TBD: increase memory limit for image processing
ini_set('memory_limit', '512M');

class AirportChartService implements IAirportChartService
{
    public function __construct(
        private IFileService $fileService,
        private IImageService $imageService
    )
    {
    }

    function uploadAdChart(UploadedFileInfo $fileInfo, UploadedPdfInfo $pdfInfo): UploadedChartInfo
    {
        if ($fileInfo->errorCode !== UPLOAD_ERR_OK) {
            return UploadedChartInfo::createError($fileInfo->getErrorMessage());
        }

        switch ($fileInfo->type) {
            case "image/png":
            case "image/jpeg":
            case "image/jpg":
                $img = $this->imageService->loadImage($fileInfo->tmpName);
                break;
            case "application/pdf":
                $img = $this->imageService->loadPdf(
                    $fileInfo->tmpName,
                    $pdfInfo->dpi,
                    $pdfInfo->page,
                    $pdfInfo->rotation
                );
                $vfrmParams = VfrmService::getVfrmChartNameProposal($fileInfo->name);
                break;
            default:
                return UploadedChartInfo::createError("invalid file type");
        }

        $filename = "chart.png";
        $tmpDir = $this->fileService->createTempDir();
        $targetFile = $this->fileService->getTempDirBase() . $tmpDir . "/" . $filename;
        $img->saveImage($targetFile);

        return new UploadedChartInfo(
            true,
            "",
            $fileInfo->name,
            $fileInfo->type,
            $tmpDir . "/" . $filename,
            $vfrmParams->chartNameProposal ?? "",
        );
    }
}
