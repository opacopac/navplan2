<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\UseCase\IFileService;
use Navplan\System\UseCase\IHttpService;
use Navplan\System\UseCase\IMailService;
use Navplan\System\UseCase\IProcService;
use Navplan\System\UseCase\ISystemServiceFactory;
use Navplan\System\UseCase\ITimeService;
use NavplanTest\System\Mock\MockFileService;
use NavplanTest\System\Mock\MockHttpService;
use NavplanTest\System\Mock\MockMailService;
use NavplanTest\System\Mock\MockProcService;
use NavplanTest\System\Mock\MockTimeService;


class MockSystemServiceFactory implements ISystemServiceFactory {
    private $fileService;
    private $procService;
    private $timeService;
    private $mailService;
    private $httpService;


    public function __construct() {
        $this->fileService = new MockFileService();
        $this->procService = new MockProcService();
        $this->timeService = new MockTimeService();
        $this->mailService = new MockMailService();
        $this->httpService = new MockHttpService();
    }


    public function getFileService(): IFileService {
        return $this->fileService;
    }

    public function getProcService(): IProcService {
        return $this->procService;
    }

    public function getTimeService(): ITimeService {
        return $this->timeService;
    }


    public function getMailService(): IMailService {
        return $this->mailService;
    }


    public function getHttpService(): IHttpService {
        return $this->httpService;
    }
}
