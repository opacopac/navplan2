<?php declare(strict_types=1);

namespace Navplan\System\UseCase;


interface ISystemConfig {
    function getMailService(): IMailService;

    function getHttpService(): IHttpService;

    function getFileService(): IFileService;
}
