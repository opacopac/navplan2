<?php declare(strict_types=1);

namespace NavplanTest\User\Mocks;

use Navplan\System\IMailService;
use Navplan\System\IHttpService;
use Navplan\User\UseCase\IUserConfig;
use Navplan\User\UseCase\IUserRepoFactory;
use NavplanTest\System\Mock\MockHttpService;
use NavplanTest\System\Mock\MockMailService;


class MockUserConfig implements IUserConfig {
    private $mailService;
    private $httpService;
    private $userRepoFactory;


    public function __construct() {
        $this->mailService = new MockMailService();
        $this->httpService = new MockHttpService();
        $this->userRepoFactory = new MockUserRepoFactory();
    }


    public function getMailService(): IMailService{
        return $this->mailService;
    }


    public function getHttpService(): IHttpService {
        return $this->httpService;
    }


    public function getUserRepoFactory(): IUserRepoFactory {
        return $this->userRepoFactory;
    }
}
