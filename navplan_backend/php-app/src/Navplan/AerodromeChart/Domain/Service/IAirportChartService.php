<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Service;

use Navplan\AerodromeChart\Domain\Model\AirportChart;
use Navplan\AerodromeChart\Domain\Model\ChartSaveParameters;
use Navplan\AerodromeChart\Domain\Model\PdfParameters;
use Navplan\AerodromeChart\Domain\Model\UploadedChartInfo;
use Navplan\Common\Domain\Model\UploadedFileInfo;


interface IAirportChartService
{
    function readById(int $id, ?string $token): AirportChart;

    /**
     * @param string $adIcao
     * @param ?string $token
     * @return AirportChart[]
     */
    function readByAdIcao(string $adIcao, ?string $token): array;

    function uploadAdChart(UploadedFileInfo $fileInfo, PdfParameters $pdfParameters): UploadedChartInfo;

    function reprojectAndSaveAdChart(string $adIcao, ChartSaveParameters $saveParams, string $token): AirportChart;

    function deleteAdChart(int $id, string $token): bool;
}
