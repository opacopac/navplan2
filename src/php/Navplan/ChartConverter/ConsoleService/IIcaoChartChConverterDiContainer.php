<?php declare(strict_types=1);

namespace Navplan\ChartConverter\ConsoleService;

use Navplan\System\DomainService\IImageService;
use Navplan\System\DomainService\ILoggingService;


interface IIcaoChartChConverterDiContainer {
    function getScreenLogger(): ILoggingService;

    function getImageService(): IImageService;
}
