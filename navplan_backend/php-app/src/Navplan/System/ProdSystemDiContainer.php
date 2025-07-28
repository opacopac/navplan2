<?php declare(strict_types=1);

namespace Navplan\System;

use Navplan\System\Domain\Service\ICurlService;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\IImageService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\System\Domain\Service\IMailService;
use Navplan\System\Domain\Service\IProcService;
use Navplan\System\Domain\Service\ISystemConfig;
use Navplan\System\Domain\Service\ITimeService;
use Navplan\System\Imagick\ImagickService;
use Navplan\System\Posix\CurlService;
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
    private ILoggingService $fileLogger;
    private IImageService $imageService;
    private ICurlService $curlService;


    public function __construct(
        private readonly ISystemConfig $systemConfig,
    )
    {
    }


    public function getHttpService(): IHttpService
    {
        if (!isset($this->httpService)) {
            $this->httpService = new HttpService();
        }

        return $this->httpService;
    }


    public function getFileService(): IFileService
    {
        if (!isset($this->fileService)) {
            $this->fileService = new FileService(
                $this->systemConfig,
                $this->getLoggingService()
            );
        }

        return $this->fileService;
    }


    public function getMailService(): IMailService
    {
        if (!isset($this->mailService)) {
            $this->mailService = new MailService(
                $this->getLoggingService()
            );
        }

        return $this->mailService;
    }


    public function getTimeService(): ITimeService
    {
        if (!isset($this->timeService)) {
            $this->timeService = new TimeService();
        }

        return $this->timeService;
    }


    public function getProcService(): IProcService
    {
        if (!isset($this->procService)) {
            $this->procService = new ProcService();
        }

        return $this->procService;
    }


    public function getLoggingService(): ILoggingService
    {
        if (!isset($this->fileLogger)) {
            $logFile = $this->systemConfig->getLogDir() . $this->systemConfig->getLogFile();
            $this->fileLogger = new LoggingService(
                $this->getTimeService(),
                $this->systemConfig->getLogLevel(),
                $logFile
            );
        }

        return $this->fileLogger;
    }


    public function getImageService(): IImageService
    {
        if (!isset($this->imageService)) {
            $this->imageService = new ImagickService();
        }

        return $this->imageService;
    }


    public function getCurlService(): ICurlService
    {
        if (!isset($this->curlService)) {
            $this->curlService = new CurlService(
                $this->getLoggingService()
            );
        }

        return $this->curlService;
    }
}
