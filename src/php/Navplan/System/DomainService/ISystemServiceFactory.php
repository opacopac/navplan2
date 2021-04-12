<?php declare(strict_types=1);

namespace Navplan\System\DomainService;


interface ISystemServiceFactory {
    function getMailService(): IMailService;

    function getHttpService(): IHttpService;

    function getFileService(): IFileService;

    function getProcService(): IProcService;

    function getTimeService(): ITimeService;
}
