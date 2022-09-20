<?php declare(strict_types=1);

namespace Navplan\System;

use Navplan\System\DomainModel\LogLevel;
use Navplan\System\DomainService\IDbService;
use Navplan\System\DomainService\IFileService;
use Navplan\System\DomainService\IHttpService;
use Navplan\System\DomainService\IImageService;
use Navplan\System\DomainService\ILoggingService;
use Navplan\System\DomainService\IMailService;
use Navplan\System\DomainService\IProcService;
use Navplan\System\DomainService\ISystemServiceFactory;
use Navplan\System\DomainService\ITimeService;
use Navplan\System\Imagick\ImagickService;
use Navplan\System\MySqlDb\MySqlDbService;
use Navplan\System\Posix\LoggingService;
use Navplan\System\Posix\SystemServiceFactory;


class ProdSystemDiContainer implements ISystemDiContainer2
{
    public const TMP_DIR = __DIR__ . "/../../../tmp/"; // TODO

    private const LOG_LEVEL = LogLevel::INFO;
    private const LOG_DIR = __DIR__ . "/../../../../logs/";
    private const LOG_FILE = self::LOG_DIR . "navplan.log";


    private ISystemServiceFactory $systemServiceFactory;
    private IHttpService $httpService;
    private IFileService $fileService;
    private IMailService $mailService;
    private ITimeService $timeService;
    private IProcService $procService;
    private ILoggingService $screenLogger;
    private ILoggingService $fileLogger;
    private IDbService $dbService;
    private IImageService $imageService;


    public function __construct() {
    }


    public function getSystemServiceFactory(): ISystemServiceFactory {
        if (!isset($this->systemServiceFactory)) {
            $this->systemServiceFactory = new SystemServiceFactory();
        }

        return $this->systemServiceFactory;
    }


    public function getHttpService(): IHttpService {
        if (!isset($this->httpService)) {
            $this->httpService = $this->getSystemServiceFactory()->getHttpService();
        }

        return $this->httpService;
    }


    public function getFileService(): IFileService {
        if (!isset($this->fileService)) {
            $this->fileService = $this->getSystemServiceFactory()->getFileService();
        }

        return $this->fileService;
    }


    public function getMailService(): IMailService {
        if (!isset($this->mailService)) {
            $this->mailService = $this->getSystemServiceFactory()->getMailService();
        }

        return $this->mailService;
    }


    public function getTimeService(): ITimeService {
        if (!isset($this->timeService)) {
            $this->timeService = $this->getSystemServiceFactory()->getTimeService();
        }

        return $this->timeService;
    }


    public function getProcService(): IProcService {
        if (!isset($this->procService)) {
            $this->procService = $this->getSystemServiceFactory()->getProcService();
        }

        return $this->procService;
    }


    public function getScreenLogger(): ILoggingService {
        if (!isset($this->screenLogger)) {
            $this->screenLogger = new LoggingService(
                $this->getTimeService(),
                self::LOG_LEVEL,
                null
            );
        }

        return $this->screenLogger;
    }


    public function getFileLogger(): ILoggingService {
        if (!isset($this->fileLogger)) {
            $this->fileLogger = new LoggingService(
                $this->getTimeService(),
                self::LOG_LEVEL,
                self::LOG_FILE
            );
        }

        return $this->fileLogger;
    }


    public function getDbService(): IDbService {
        global $db_host, $db_user, $db_pw, $db_name;

        if (!isset($this->dbService)) {
            $this->dbService = new MySqlDbService(
                $this->getScreenLogger()
            );
            $this->dbService->init($db_host, $db_user, $db_pw, $db_name);
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
