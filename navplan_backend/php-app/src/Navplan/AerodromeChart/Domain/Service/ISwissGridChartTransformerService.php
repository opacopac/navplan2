<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Service;

use Navplan\AerodromeChart\Domain\Model\ChartRegistration;
use Navplan\AerodromeChart\Domain\Model\WorldFileInfo;


interface ISwissGridChartTransformerService
{
    function createChartProjektion(string $chartUrl, ChartRegistration $chartReg): string;

    function parseWorldFile(string $worldFile): WorldFileInfo;
}
