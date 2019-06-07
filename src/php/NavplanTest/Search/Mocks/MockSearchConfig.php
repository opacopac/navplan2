<?php declare(strict_types=1);

namespace NavplanTest\Search\Mocks;

require_once __DIR__ . "/../../../config_test.php";

use Navplan\Geoname\UseCase\IGeonameRepoFactory;
use Navplan\Notam\UseCase\INotamRepoFactory;
use Navplan\Search\UseCase\ISearchConfig;
use Navplan\Db\IDb\IDbService;
use Navplan\System\IMailService;
use Navplan\System\IHttpResponseService;
use Navplan\OpenAip\UseCase\IOpenAipRepoFactory;
use Navplan\User\UseCase\IUserRepoFactory;
use NavplanTest\Db\Mock\DbServiceMock;
use NavplanTest\Geoname\Mocks\MockGeonameRepoFactory;
use NavplanTest\Notam\Mocks\MockNotamRepoFactory;
use NavplanTest\OpenAip\Mocks\MockOpenAipRepoFactory;
use NavplanTest\System\Mock\MockHttpResponseService;
use NavplanTest\System\Mock\MockMailService;
use NavplanTest\User\Mocks\MockUserRepoFactory;

class MockSearchConfig implements ISearchConfig {
    private $dbService;
    private $mailService;
    private $httpResponseService;
    private $openAipRepoFactory;
    private $userRepoFactory;
    private $geonameRepoFactory;
    private $notamRepoFactory;


    public function __construct() {
        $this->dbService = new DbServiceMock();
        $this->mailService = new MockMailService();
        $this->httpResponseService = new MockHttpResponseService();
        $this->openAipRepoFactory = new MockOpenAipRepoFactory();
        $this->userRepoFactory = new MockUserRepoFactory();
        $this->geonameRepoFactory = new MockGeonameRepoFactory();
        $this->notamRepoFactory = new MockNotamRepoFactory();
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


    public function getOpenAipRepoFactory(): IOpenAipRepoFactory {
        return $this->openAipRepoFactory;
    }


    public function getUserRepoFactory(): IUserRepoFactory {
        return $this->userRepoFactory;
    }


    public function getGeonameRepoFactory(): IGeonameRepoFactory {
        return $this->geonameRepoFactory;
    }


    public function getNotamRepoFactory(): INotamRepoFactory {
        return $this->notamRepoFactory;
    }
}
