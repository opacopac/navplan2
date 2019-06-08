<?php declare(strict_types=1);

namespace NavplanTest\Search\Mocks;

require_once __DIR__ . "/../../../config_test.php";

use Navplan\Geoname\UseCase\IGeonameRepo;
use Navplan\Notam\UseCase\INotamRepo;
use Navplan\Search\UseCase\ISearchConfig;
use Navplan\System\UseCase\IMailService;
use Navplan\System\UseCase\IHttpService;
use Navplan\OpenAip\UseCase\IOpenAipRepoFactory;
use Navplan\Terrain\UseCase\ITerrainRepo;
use Navplan\User\UseCase\IUserRepoFactory;
use NavplanTest\Geoname\Mocks\MockGeonameRepo;
use NavplanTest\Notam\Mocks\MockNotamRepo;
use NavplanTest\OpenAip\Mocks\MockOpenAipRepoFactory;
use NavplanTest\System\Mock\MockHttpService;
use NavplanTest\System\Mock\MockMailService;
use NavplanTest\Terrain\Mocks\MockTerrainRepo;
use NavplanTest\User\Mocks\MockUserRepoFactory;


class MockSearchConfig implements ISearchConfig {
    private $mailService;
    private $httpService;
    private $openAipRepoFactory;
    private $userRepoFactory;
    private $geonameRepo;
    private $notamRepo;
    private $terrainRepo;


    public function __construct() {
        $this->mailService = new MockMailService();
        $this->httpService = new MockHttpService();
        $this->openAipRepoFactory = new MockOpenAipRepoFactory();
        $this->userRepoFactory = new MockUserRepoFactory();
        $this->geonameRepo = new MockGeonameRepo();
        $this->notamRepo = new MockNotamRepo();
        $this->terrainRepo = new MockTerrainRepo();
    }


    public function getMailService(): IMailService{
        return $this->mailService;
    }


    public function getHttpService(): IHttpService {
        return $this->httpService;
    }


    public function getOpenAipRepoFactory(): IOpenAipRepoFactory {
        return $this->openAipRepoFactory;
    }


    public function getUserRepoFactory(): IUserRepoFactory {
        return $this->userRepoFactory;
    }


    public function getGeonameRepo(): IGeonameRepo {
        return $this->geonameRepo;
    }


    public function getNotamRepo(): INotamRepo {
        return $this->notamRepo;
    }


    public function getTerrainRepo(): ITerrainRepo {
        return $this->terrainRepo;
    }
}
