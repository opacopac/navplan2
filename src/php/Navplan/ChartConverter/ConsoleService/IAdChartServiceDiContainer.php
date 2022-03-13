<?php declare(strict_types=1);

namespace Navplan\ChartConverter\ConsoleService;

use Navplan\ChartConverter\DomainService\IAdChartConverterService;


interface IAdChartServiceDiContainer {
    function getAdPdfChartService(): IAdChartConverterService;
}
