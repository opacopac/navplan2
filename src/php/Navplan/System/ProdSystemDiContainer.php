<?php declare(strict_types=1);

namespace Navplan\System;

use Navplan\System\DomainService\IDbService;
use Navplan\System\DomainService\IFileService;
use Navplan\System\DomainService\IHttpService;
use Navplan\System\DomainService\IImageService;
use Navplan\System\DomainService\ILoggingService;
use Navplan\System\DomainService\IMailService;
use Navplan\System\DomainService\IProcService;
use Navplan\System\DomainService\ISystemConfigService;
use Navplan\System\DomainService\ITimeService;
use Navplan\System\Imagick\ImagickService;
use Navplan\System\MySqlDb\IDbConfigService;
use Navplan\System\MySqlDb\MySqlDbService;
use Navplan\System\Posix\FileService;
use Navplan\System\Posix\HttpService;
use Navplan\System\Posix\LoggingService;
use Navplan\System\Posix\MailService;
use Navplan\System\Posix\ProcService;
use Navplan\System\Posix\TimeService;


class ProdSystemDiContainer implements ISystemDiContainer
{
    private IHttpService $httpService;
    private IFileService $fileService;
    private IMailService $mailService;
    private ITimeService $timeService;
    private IProcService $procService;
    private ILoggingService $screenLogger;
    private ILoggingService $fileLogger;
    private IDbService $dbService;
    private IImageService $imageService;


    public function __construct(
        private readonly ISystemConfigService $systemConfigService,
        private readonly IDbConfigService $dbConfigService
    ) {
    }


    public function getHttpService(): IHttpService {
        if (!isset($this->httpService)) {
            $this->httpService = new HttpService();
        }

        return $this->httpService;
    }


    public function getFileService(): IFileService {
        if (!isset($this->fileService)) {
            $this->fileService = new FileService($this->systemConfigService);
        }

        return $this->fileService;
    }


    public function getMailService(): IMailService {
        if (!isset($this->mailService)) {
            $this->mailService = new MailService();
        }

        return $this->mailService;
    }


    public function getTimeService(): ITimeService {
        if (!isset($this->timeService)) {
            $this->timeService = new TimeService();
        }

        return $this->timeService;
    }


    public function getProcService(): IProcService {
        if (!isset($this->procService)) {
            $this->procService = new ProcService();
        }

        return $this->procService;
    }


    public function getScreenLogger(): ILoggingService {
        if (!isset($this->screenLogger)) {
            $this->screenLogger = new LoggingService(
                $this->getTimeService(),
                $this->systemConfigService->getLogLevel(),
                null
            );
        }

        return $this->screenLogger;
    }


    public function getFileLogger(): ILoggingService {
        if (!isset($this->fileLogger)) {
            $this->fileLogger = new LoggingService(
                $this->getTimeService(),
                $this->systemConfigService->getLogLevel(),
                $this->systemConfigService->getLogFile()
            );
        }

        return $this->fileLogger;
    }


    public function getDbService(): IDbService {
        if (!isset($this->dbService)) {
            $this->dbService = new MySqlDbService(
                $this->getScreenLogger()
            );
            $credentials = $this->dbConfigService->getCredentials();
            $this->dbService->init(
                $credentials->host,
                $credentials->user,
                $credentials->pw,
                $credentials->database
            );
        }

        return $this->dbService;
    }


    public function getImageService(): IImageService {
        if (!isset($this->imageService)) {
            $this->imageService = new ImagickService();
        }

        return $this->imageService;
    }
}
