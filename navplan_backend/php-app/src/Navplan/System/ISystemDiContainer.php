<?php declare(strict_types=1);

namespace Navplan\System;

use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\System\Domain\Service\ITimeService;


interface ISystemDiContainer
{

    function getFileService(): IFileService;

    function getTimeService(): ITimeService;

    function getLoggingService(): ILoggingService;
}
