<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Service;

use Navplan\AerodromeChart\Domain\Model\ChartProjectionResult;
use Navplan\AerodromeChart\Domain\Model\ChartRegistration;
use Navplan\AerodromeChart\Domain\Model\WorldFileInfo;


interface ISwissGridChartTransformerService
{
    function createChartProjektion(string $chartFile, ChartRegistration $chartReg): ChartProjectionResult;

    function getWorldFile(string $chartFile): string;

    function parseWorldFile(string $worldFile): WorldFileInfo;
}
