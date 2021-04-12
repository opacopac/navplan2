<?php declare(strict_types=1);

namespace Navplan\System\Posix;

use Navplan\System\DomainService\IFileService;
use Navplan\System\DomainService\IHttpService;
use Navplan\System\DomainService\IMailService;
use Navplan\System\DomainService\IProcService;
use Navplan\System\DomainService\ISystemServiceFactory;
use Navplan\System\DomainService\ITimeService;


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
