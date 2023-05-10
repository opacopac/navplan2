<?php declare(strict_types=1);

namespace Navplan\System;

use Navplan\System\DomainService\IFileService;
use Navplan\System\DomainService\IHttpService;
use Navplan\System\DomainService\IImageService;
use Navplan\System\DomainService\ILoggingService;
use Navplan\System\DomainService\IMailService;
use Navplan\System\DomainService\IProcService;
use Navplan\System\DomainService\ITimeService;


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
