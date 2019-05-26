<?php declare(strict_types=1);

namespace NavplanTest\Search\Mocks;

use Navplan\Geoname\IRepo\IGeonameRepoFactory;
use Navplan\Search\IConfig\ISearchConfig;
use Navplan\Shared\IDbService;
use Navplan\Shared\IMailService;
use Navplan\Shared\IHttpResponseService;
use Navplan\OpenAip\IRepo\IOpenAipRepoFactory;
use Navplan\User\IRepo\IUserRepoFactory;
use NavplanTest\DbServiceMock;
use NavplanTest\Geoname\Mocks\GeonameMockRepoFactory;
use NavplanTest\HttpResponseServiceMock;
use NavplanTest\MailServiceMock;
use NavplanTest\OpenAip\Mocks\OpenAipMockRepoFactory;
use NavplanTest\User\Mocks\UserMockRepoFactory;


class SearchConfigMock implements ISearchConfig {
    private $dbService;
    private $mailService;
    private $httpResponseService;
    private $openAipRepoFactory;
    private $userRepoFactory;
    private $geonameRepoFactory;


    public function __construct() {
        $this->dbService = new DbServiceMock();
        $this->mailService = new MailServiceMock();
        $this->httpResponseService = new HttpResponseServiceMock();
        $this->openAipRepoFactory = new OpenAipMockRepoFactory();
        $this->userRepoFactory = new UserMockRepoFactory();
        $this->geonameRepoFactory = new GeonameMockRepoFactory();
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
}
