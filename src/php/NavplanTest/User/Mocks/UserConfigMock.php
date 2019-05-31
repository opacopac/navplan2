<?php declare(strict_types=1);

namespace NavplanTest\User\Mocks;

use Navplan\Shared\IDbService;
use Navplan\Shared\IMailService;
use Navplan\Shared\IHttpResponseService;
use Navplan\User\UseCase\IUserConfig;
use Navplan\User\UseCase\IUserRepoFactory;
use NavplanTest\DbServiceMock;
use NavplanTest\HttpResponseServiceMock;
use NavplanTest\MailServiceMock;


class UserConfigMock implements IUserConfig {
    private $dbService;
    private $mailService;
    private $httpResponseService;
    private $userRepoFactory;


    public function __construct() {
        $this->dbService = new DbServiceMock();
        $this->mailService = new MailServiceMock();
        $this->httpResponseService = new HttpResponseServiceMock();
        $this->userRepoFactory = new UserMockRepoFactory();
    }


    public function getDbService(): IDbService {
        return $this->dbService;
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
