<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh\ConsoleService;

use Navplan\System\DomainService\IImageService;
use Navplan\System\DomainService\ILoggingService;


interface IIcaoChartChServiceDiContainer {
    function getScreenLogger(): ILoggingService;

    function getImageService(): IImageService;
}
