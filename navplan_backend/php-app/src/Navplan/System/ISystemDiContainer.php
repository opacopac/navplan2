<?php declare(strict_types=1);

namespace Navplan\System;

use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\IImageService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\System\Domain\Service\IMailService;
use Navplan\System\Domain\Service\IProcService;
use Navplan\System\Domain\Service\ITimeService;


interface ISystemDiContainer {
    function getHttpService(): IHttpService;

    function getFileService(): IFileService;

    function getMailService(): IMailService;

    function getTimeService(): ITimeService;

    function getProcService(): IProcService;

    function getScreenLogger(): ILoggingService;

    function getFileLogger(): ILoggingService;

    function getImageService(): IImageService;
}
