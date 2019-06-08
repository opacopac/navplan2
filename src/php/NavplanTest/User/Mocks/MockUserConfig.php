<?php declare(strict_types=1);

namespace NavplanTest\User\Mocks;

use Navplan\System\IMailService;
use Navplan\System\IHttpResponseService;
use Navplan\User\UseCase\IUserConfig;
use Navplan\User\UseCase\IUserRepoFactory;
use NavplanTest\System\Mock\MockHttpResponseService;
use NavplanTest\System\Mock\MockMailService;


class MockUserConfig implements IUserConfig {
    private $mailService;
    private $httpResponseService;
    private $userRepoFactory;


    public function __construct() {
        $this->mailService = new MockMailService();
        $this->httpResponseService = new MockHttpResponseService();
        $this->userRepoFactory = new MockUserRepoFactory();
    }


    public function getMailService(): IMailService{
        return $this->mailService;
    }


    public function getHttpResponseService(): IHttpResponseService {
        return $this->httpResponseService;
    }


    public function getUserRepoFactory(): IUserRepoFactory {
        return $this->userRepoFactory;
    }
}
