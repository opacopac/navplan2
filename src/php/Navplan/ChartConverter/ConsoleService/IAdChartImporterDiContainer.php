<?php declare(strict_types=1);

namespace Navplan\ChartConverter\ConsoleService;

use Navplan\ChartConverter\DomainService\IImportAdChartService;


interface IAdChartImporterDiContainer {
    function getImportAdChartService(): IImportAdChartService;
}
