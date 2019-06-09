<?php declare(strict_types=1);

namespace NavplanTest;

require_once __DIR__ . "/../config_test.php";

use Navplan\Flightroute\UseCase\IFlightrouteConfig;
use Navplan\Flightroute\UseCase\IFlightrouteRepo;
use Navplan\Geoname\UseCase\IGeonameConfig;
use Navplan\Geoname\UseCase\IGeonameRepo;
use Navplan\Notam\UseCase\INotamConfig;
use Navplan\Notam\UseCase\INotamRepo;
use Navplan\OpenAip\UseCase\IOpenAipConfig;
use Navplan\Search\UseCase\ISearchConfig;
use Navplan\OpenAip\UseCase\IOpenAipRepoFactory;
use Navplan\System\UseCase\ISystemConfig;
use Navplan\System\UseCase\ISystemServiceFactory;
use Navplan\Terrain\UseCase\ITerrainConfig;
use Navplan\Terrain\UseCase\ITerrainRepo;
use Navplan\Traffic\UseCase\ITrafficConfig;
use Navplan\Traffic\UseCase\IAdsbexGateway;
use Navplan\Traffic\UseCase\IOgnGateway;
use Navplan\User\UseCase\IUserConfig;
use Navplan\User\UseCase\IUserRepoFactory;
use NavplanTest\Flightroute\Mocks\MockFlightrouteRepo;
use NavplanTest\Geoname\Mocks\MockGeonameRepo;
use NavplanTest\Notam\Mocks\MockNotamRepo;
use NavplanTest\OpenAip\Mocks\MockOpenAipRepoFactory;
use NavplanTest\System\Mock\MockSystemServiceFactory;
use NavplanTest\Terrain\Mocks\MockTerrainRepo;
use NavplanTest\Traffic\Mocks\MockAdsbexGateway;
use NavplanTest\Traffic\Mocks\MockOgnGateway;
use NavplanTest\User\Mocks\MockUserRepoFactory;


class MockNavplanConfig implements ISystemConfig, ITerrainConfig, IUserConfig, IFlightrouteConfig, IGeonameConfig,
    INotamConfig, IOpenAipConfig, ISearchConfig, ITrafficConfig {
    private $systemServiceFactory;
    private $flightrouteRepo;
    private $openAipRepoFactory;
    private $userRepoFactory;
    private $geonameRepo;
    private $notamRepo;
    private $terrainRepo;
    private $adsbexGateway;
    private $ognGateway;


    public function __construct() {
        $this->systemServiceFactory = new MockSystemServiceFactory();
        $this->flightrouteRepo = new MockFlightrouteRepo();
        $this->openAipRepoFactory = new MockOpenAipRepoFactory();
        $this->userRepoFactory = new MockUserRepoFactory();
        $this->geonameRepo = new MockGeonameRepo();
        $this->notamRepo = new MockNotamRepo();
        $this->terrainRepo = new MockTerrainRepo();
        $this->adsbexGateway = new MockAdsbexGateway();
        $this->ognGateway = new MockOgnGateway();
    }


    public function getSystemServiceFactory(): ISystemServiceFactory {
        return $this->systemServiceFactory;
    }


    public function getFlightrouteRepo(): IFlightrouteRepo {
        return $this->flightrouteRepo;
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


    public function getAdsbexGateway(): IAdsbexGateway {
        return $this->adsbexGateway;
    }


    public function getOgnGateway(): IOgnGateway {
        return $this->ognGateway;
    }
}
