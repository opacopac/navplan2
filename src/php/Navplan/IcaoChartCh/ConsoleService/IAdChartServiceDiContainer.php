<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh\ConsoleService;

use Navplan\IcaoChartCh\DomainService\IAdChartConverterService;


interface IAdChartServiceDiContainer {
    function getAdPdfChartService(): IAdChartConverterService;
}
