<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Service;

use InvalidArgumentException;
use Navplan\AerodromeChart\Domain\Command\IAirportChartCreateCommand;
use Navplan\AerodromeChart\Domain\Model\AirportChart;
use Navplan\AerodromeChart\Domain\Model\ChartSaveParameters;
use Navplan\AerodromeChart\Domain\Model\GeoCoordinateType;
use Navplan\AerodromeChart\Domain\Model\PdfParameters;
use Navplan\AerodromeChart\Domain\Model\UploadedChartInfo;
use Navplan\AerodromeChart\Domain\Model\WorldFileInfo;
use Navplan\AerodromeChart\Domain\Query\IAirportChartByAirportQuery;
use Navplan\AerodromeChart\Domain\Query\IAirportChartByIdQuery;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\UploadedFileInfo;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IImageService;
use Navplan\User\Domain\Service\IUserService;


// TBD: increase memory limit for image processing
ini_set('memory_limit', '1024M');

class AirportChartService implements IAirportChartService
{
    public function __construct(
        private IAerodromeChartConfig $aerodromeChartConfig,
        private IFileService $fileService,
        private IImageService $imageService,
        private IUserService $userService,
        private ISwissGridChartTransformerService $swissGridChartTransformerService,
        private IAirportChartByIdQuery $airportChartByIdQuery,
        private IAirportChartByAirportQuery $airportChartByAirportQuery,
        private IAirportChartCreateCommand $airportChartCreateCommand
    )
    {
    }


    public function readById(int $id, ?string $token): AirportChart
    {
        $userId = $token !== null
            ? $this->userService->getUserOrThrow($token)->id
            : 0;
        return $this->airportChartByIdQuery->read($id, $userId);
    }


    public function readByAdIcao(string $adIcao, ?string $token): array
    {
        $userId = $token !== null
            ? $this->userService->getUserOrThrow($token)->id
            : 0;
        return $this->airportChartByAirportQuery->readList($adIcao, $userId);
    }


    public function uploadAdChart(UploadedFileInfo $fileInfo, ?PdfParameters $pdfParameters): UploadedChartInfo
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
                    $pdfParameters->dpi,
                    $pdfParameters->page,
                    $pdfParameters->rotation
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
            $vfrmParams->scaleProposal ?? 0
        );
    }


    public function reprojectAndSaveAdChart(string $adIcao, ChartSaveParameters $saveParams, string $token): AirportChart
    {
        $userId = $this->userService->getUserOrThrow($token)->id;

        // calculate reprojection
        $projectionResult = $this->swissGridChartTransformerService->createChartProjektion(
            $this->fileService->getTempDirBase() . $saveParams->chartUrl,
            $saveParams->chartRegistration
        );

        // move file to chart folder
        $targetFile = $this->moveFileToChartFolder($projectionResult->outputChartFile);

        // calc extent
        $extent = $this->calcExtent($targetFile, $projectionResult->worldFileInfo);

        // save to db
        $adChart = new AirportChart(
            0,
            $adIcao,
            "VFRM", // TODO
            $saveParams->chartName,
            basename($targetFile),
            $extent,
            $saveParams->originalFileParameters,
            $saveParams->chartRegistration
        );

        return $this->airportChartCreateCommand->create($adChart, $userId);
    }


    private function moveFileToChartFolder(string $chartFile): string
    {
        $newFilename = $this->fileService->getRandomFilename($chartFile);
        $targetDir = $this->aerodromeChartConfig->getChartBaseDir();
        $targetFile = $targetDir . $newFilename;
        $this->fileService->rename($chartFile, $targetFile);

        return $targetFile;
    }


    private function calcExtent(string $chartFile, WorldFileInfo $worldFileInfo): Extent2d {
        if ($worldFileInfo->geoCoordTopLeft->getType() !== GeoCoordinateType::LON_LAT) {
            throw new InvalidArgumentException("Invalid coordinate type in world file");
        }

        $img = $this->imageService->loadImage($chartFile);

        $posTl = $worldFileInfo->geoCoordTopLeft;
        $posR = $posTl->getE() + $img->getWidth() * $worldFileInfo->xCompPixelWidth;
        $posB = $posTl->getN() + $img->getHeight() * $worldFileInfo->yCompPixelHeight;
        $minN = min($posTl->getN(), $posB);
        $maxN = max($posTl->getN(), $posB);
        $minE = min($posTl->getE(), $posR);
        $maxE = max($posTl->getE(), $posR);

        return Extent2d::createFromCoords($minE, $minN, $maxE, $maxN);
    }
}
