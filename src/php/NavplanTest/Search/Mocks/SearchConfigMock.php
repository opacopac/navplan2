<?php declare(strict_types=1);

namespace NavplanTest\Search\Mocks;

require_once __DIR__ . "/../../../config_test.php";

use Navplan\Geoname\UseCase\IGeonameRepoFactory;
use Navplan\Notam\UseCase\INotamRepoFactory;
use Navplan\Search\UseCase\ISearchConfig;
use Navplan\Shared\IDbService;
use Navplan\Shared\IMailService;
use Navplan\Shared\IHttpResponseService;
use Navplan\OpenAip\UseCase\IOpenAipRepoFactory;
use Navplan\User\UseCase\IUserRepoFactory;
use NavplanTest\DbServiceMock;
use NavplanTest\Geoname\Mocks\GeonameMockRepoFactory;
use NavplanTest\HttpResponseServiceMock;
use NavplanTest\MailServiceMock;
use NavplanTest\Notam\Mocks\NotamMockRepoFactory;
use NavplanTest\OpenAip\Mocks\OpenAipMockRepoFactory;
use NavplanTest\User\Mocks\UserMockRepoFactory;

class SearchConfigMock implements ISearchConfig {
    private $dbService;
    private $mailService;
    private $httpResponseService;
    private $openAipRepoFactory;
    private $userRepoFactory;
    private $geonameRepoFactory;
    private $notamRepoFactory;


    public function __construct() {
        $this->dbService = new DbServiceMock();
        $this->mailService = new MailServiceMock();
        $this->httpResponseService = new HttpResponseServiceMock();
        $this->openAipRepoFactory = new OpenAipMockRepoFactory();
        $this->userRepoFactory = new UserMockRepoFactory();
        $this->geonameRepoFactory = new GeonameMockRepoFactory();
        $this->notamRepoFactory = new NotamMockRepoFactory();
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
