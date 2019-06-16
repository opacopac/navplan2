<?php declare(strict_types=1);

namespace NavplanTest;

use Navplan\Db\UseCase\IDbConfig;
use Navplan\Db\UseCase\IDbService;
use Navplan\Flightroute\UseCase\IFlightrouteConfig;
use Navplan\Flightroute\UseCase\IFlightrouteRepo;
use Navplan\Geoname\UseCase\IGeonameConfig;
use Navplan\Geoname\UseCase\IGeonameRepo;
use Navplan\Meteo\UseCase\IMeteoConfig;
use Navplan\Meteo\UseCase\IMeteoRepo;
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
use Navplan\Traffic\UseCase\IAdsbexRepo;
use Navplan\Traffic\UseCase\IOgnRepo;
use Navplan\Traffic\UseCase\ITrafficDetailRepo;
use Navplan\User\UseCase\IUserConfig;
use Navplan\User\UseCase\IUserRepoFactory;
use Navplan\User\UseCase\TokenService;
use NavplanTest\Db\Mock\MockDbService;
use NavplanTest\Flightroute\Mocks\MockFlightrouteRepo;
use NavplanTest\Geoname\Mocks\MockGeonameRepo;
use NavplanTest\Meteo\Mocks\MockMeteoRepo;
use NavplanTest\Notam\Mocks\MockNotamRepo;
use NavplanTest\OpenAip\Mocks\MockOpenAipRepoFactory;
use NavplanTest\System\Mock\MockSystemServiceFactory;
use NavplanTest\Terrain\Mocks\MockTerrainRepo;
use NavplanTest\Traffic\Mocks\MockAdsbexRepo;
use NavplanTest\Traffic\Mocks\MockOgnRepo;
use NavplanTest\Traffic\Mocks\MockTrafficDetailRepo;
use NavplanTest\User\Mocks\MockUserRepoFactory;


class MockNavplanConfig implements ISystemConfig, IDbConfig, ITerrainConfig, IUserConfig, IFlightrouteConfig, IGeonameConfig,
    INotamConfig, IOpenAipConfig, ISearchConfig, ITrafficConfig, IMeteoConfig {
    private $systemServiceFactory;
    private $dbService;
    private $flightrouteRepo;
    private $openAipRepoFactory;
    private $userRepoFactory;
    private $tokenService;
    private $geonameRepo;
    private $notamRepo;
    private $terrainRepo;
    private $adsbexGateway;
    private $ognGateway;
    private $trafficRepo;
    private $meteoRepo;


    public function __construct() {
        global $jwt_secret, $jwt_issuer;
        require_once __DIR__ . "/../config_test.php";

        $this->systemServiceFactory = new MockSystemServiceFactory();
        $this->dbService = new MockDbService();
        $this->flightrouteRepo = new MockFlightrouteRepo();
        $this->openAipRepoFactory = new MockOpenAipRepoFactory();
        $this->userRepoFactory = new MockUserRepoFactory();
        $this->tokenService = new TokenService($jwt_secret, $jwt_issuer);
        $this->geonameRepo = new MockGeonameRepo();
        $this->notamRepo = new MockNotamRepo();
        $this->terrainRepo = new MockTerrainRepo();
        $this->adsbexGateway = new MockAdsbexRepo();
        $this->ognGateway = new MockOgnRepo();
        $this->trafficRepo = new MockTrafficDetailRepo();
        $this->meteoRepo = new MockMeteoRepo();
    }


    public function getSystemServiceFactory(): ISystemServiceFactory {
        return $this->systemServiceFactory;
    }


    public function getDbService(): IDbService {
        return $this->dbService;
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


    public function getTokenService(): TokenService {
        return $this->tokenService;
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


    public function getAdsbexGateway(): IAdsbexRepo {
        return $this->adsbexGateway;
    }


    public function getOgnGateway(): IOgnRepo {
        return $this->ognGateway;
    }


    public function getTrafficRepo(): ITrafficDetailRepo {
        return $this->trafficRepo;
    }


    public function getMeteoRepo(): IMeteoRepo {
        return $this->meteoRepo;
    }
}
