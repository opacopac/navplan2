<?php declare(strict_types=1);

namespace Navplan\System;

use Navplan\System\Posix\FileService;
use Navplan\System\Posix\HttpService;
use Navplan\System\Posix\MailService;
use Navplan\System\Posix\ProcService;
use Navplan\System\Posix\TimeService;
use Navplan\System\UseCase\IMailService;
use Navplan\System\UseCase\IProcService;
use Navplan\System\UseCase\IFileService;
use Navplan\System\UseCase\IHttpService;
use Navplan\System\UseCase\ISystemServiceFactory;
use Navplan\System\UseCase\ITimeService;


class SystemServiceFactory implements ISystemServiceFactory {
    public function __construct() {
    }


    public function getMailService(): IMailService {
        return MailService::getInstance();
    }


    public function getFileService(): IFileService {
        return FileService::getInstance();
    }


    public function getProcService(): IProcService {
        return ProcService::getInstance();
    }


    public function getTimeService(): ITimeService {
        return TimeService::getInstance();
    }


    public function getHttpService(): IHttpService {
        return HttpService::getInstance();
    }
}
