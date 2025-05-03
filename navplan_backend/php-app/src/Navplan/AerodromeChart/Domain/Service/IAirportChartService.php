<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Service;

use Navplan\AerodromeChart\Domain\Model\AirportChart;
use Navplan\AerodromeChart\Domain\Model\UploadedChartInfo;
use Navplan\AerodromeChart\Domain\Model\UploadedPdfInfo;
use Navplan\Common\Domain\Model\UploadedFileInfo;


interface IAirportChartService
{
    function readById(int $id, ?string $token): AirportChart;

    /**
     * @param string $adId
     * @param string $token
     * @return AirportChart[]
     */
    function readByAdId(int $adId, ?string $token): array;

    function uploadAdChart(UploadedFileInfo $fileInfo, UploadedPdfInfo $pdfInfo): UploadedChartInfo;

    function saveAdChart(AirportChart $adChart, string $token): bool;
}
