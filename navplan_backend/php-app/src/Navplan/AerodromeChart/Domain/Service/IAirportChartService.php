<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Service;

use Navplan\AerodromeChart\Domain\Model\UploadedChartInfo;
use Navplan\AerodromeChart\Domain\Model\UploadedPdfInfo;
use Navplan\Common\Domain\Model\UploadedFileInfo;


interface IAirportChartService
{
    function uploadAdChart(UploadedFileInfo $fileInfo, UploadedPdfInfo $pdfInfo): UploadedChartInfo;
}
