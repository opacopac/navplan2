<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\DomainService\ISystemServiceFactory;


class MockSystemServiceFactory implements ISystemServiceFactory {
    private MockFileService $fileService;
    private MockProcService $procService;
    private MockTimeService $timeService;
    private MockMailService $mailService;
    private MockHttpService $httpService;


    public function __construct() {
        $this->fileService = new MockFileService();
        $this->procService = new MockProcService();
        $this->timeService = new MockTimeService();
        $this->mailService = new MockMailService();
        $this->httpService = new MockHttpService();
    }


    public function getFileService(): MockFileService {
        return $this->fileService;
    }


    public function getProcService(): MockProcService {
        return $this->procService;
    }


    public function getTimeService(): MockTimeService {
        return $this->timeService;
    }


    public function getMailService(): MockMailService {
        return $this->mailService;
    }


    public function getHttpService(): MockHttpService {
        return $this->httpService;
    }
}
