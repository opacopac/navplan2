<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Service;

use Navplan\AerodromeChart\Domain\Command\IAirportChartCreateCommand;
use Navplan\AerodromeChart\Domain\Model\AirportChart;
use Navplan\AerodromeChart\Domain\Model\ChartSaveParameters;
use Navplan\AerodromeChart\Domain\Model\PdfParameters;
use Navplan\AerodromeChart\Domain\Model\UploadedChartInfo;
use Navplan\AerodromeChart\Domain\Query\IAirportChartByAirportQuery;
use Navplan\AerodromeChart\Domain\Query\IAirportChartByIdQuery;
use Navplan\Common\Domain\Model\UploadedFileInfo;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IImageService;
use Navplan\User\Domain\Service\IUserService;


// TBD: increase memory limit for image processing
ini_set('memory_limit', '1024M');

class AirportChartService implements IAirportChartService
{
    public function __construct(
        private IFileService $fileService,
        private IImageService $imageService,
        private IUserService $userService,
        private IAirportChartByIdQuery $airportChartByIdQuery,
        private IAirportChartByAirportQuery $airportChartByAirportQuery,
        private IAirportChartCreateCommand $airportChartCreateCommand
    )
    {
    }


    function readById(int $id, ?string $token): AirportChart
    {
        $userId = $token !== null
            ? $this->userService->getUserOrThrow($token)->id
            : 0;
        return $this->airportChartByIdQuery->read($id, $userId);
    }


    function readByAdIcao(string $adIcao, ?string $token): array
    {
        $userId = $token !== null
            ? $this->userService->getUserOrThrow($token)->id
            : 0;
        return $this->airportChartByAirportQuery->readList($adIcao, $userId);
    }


    function uploadAdChart(UploadedFileInfo $fileInfo, ?PdfParameters $pdfParameters): UploadedChartInfo
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
        );
    }


    function reprojectAndSaveAdChart(ChartSaveParameters $saveParams, string $token): AirportChart
    {
        $userId = $this->userService->getUserOrThrow($token)->id;

        // TODO reproject chart
        $output = shell_exec('/var/www/html/tools/swissgrid_chart_transformer arg1 arg2');
        echo $output;

        return $this->airportChartCreateCommand->create(null, $userId);
    }
}
