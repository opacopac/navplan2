<?php declare(strict_types=1);

namespace Navplan;

// show errors on web page
// error_reporting(E_ALL);
ini_set('display_errors', '1');

use Navplan\Db\MySqlDb\MySqlDbService;
use Navplan\Db\UseCase\IDbConfig;
use Navplan\Db\UseCase\IDbService;
use Navplan\Flightroute\DbRepo\DbFlightrouteRepo;
use Navplan\Flightroute\UseCase\IFlightrouteConfig;
use Navplan\Flightroute\UseCase\IFlightrouteRepo;
use Navplan\Geoname\DbRepo\DbGeonameRepo;
use Navplan\Geoname\UseCase\IGeonameConfig;
use Navplan\Geoname\UseCase\IGeonameRepo;
use Navplan\Meteo\DbRepo\DbMeteoRepo;
use Navplan\Meteo\UseCase\IMeteoConfig;
use Navplan\Meteo\UseCase\IMeteoRepo;
use Navplan\Notam\DbRepo\DbNotamRepo;
use Navplan\Notam\UseCase\INotamConfig;
use Navplan\Notam\UseCase\INotamRepo;
use Navplan\OpenAip\DbRepo\DbOpenAipRepoFactory;
use Navplan\OpenAip\UseCase\IOpenAipConfig;
use Navplan\Search\UseCase\ISearchConfig;
use Navplan\System\Posix\SystemServiceFactory;
use Navplan\OpenAip\UseCase\IOpenAipRepoFactory;
use Navplan\System\UseCase\ISystemConfig;
use Navplan\System\UseCase\ISystemServiceFactory;
use Navplan\Terrain\FileRepo\FileTerrainRepo;
use Navplan\Terrain\UseCase\ITerrainConfig;
use Navplan\Terrain\UseCase\ITerrainRepo;
use Navplan\Traffic\AdsbexGateway\AdsbexGateway;
use Navplan\Traffic\DbRepo\DbTrafficRepo;
use Navplan\Traffic\OgnGateway\OgnGateway;
use Navplan\Traffic\UseCase\IAdsbexGateway;
use Navplan\Traffic\UseCase\IOgnGateway;
use Navplan\Traffic\UseCase\ITrafficConfig;
use Navplan\Traffic\UseCase\ITrafficRepo;
use Navplan\User\DbRepo\DbUserRepoFactory;
use Navplan\User\UseCase\IUserConfig;
use Navplan\User\UseCase\IUserRepoFactory;
use Navplan\User\UseCase\TokenService;


class NavplanConfigProd implements ISystemConfig, IDbConfig, ITerrainConfig, IUserConfig, IFlightrouteConfig,
    IGeonameConfig, INotamConfig, IOpenAipConfig, ISearchConfig, ITrafficConfig, IMeteoConfig
{
    private $systemServiceFactory;
    private $dbService;
    private $flightrouteRepo;
    private $userRepoFactory;
    private $tokenService;
    private $openAipRepoFactory;
    private $geonameRepo;
    private $notamRepo;
    private $terrainRepo;
    private $adsbexGateway;
    private $ognGateway;
    private $trafficRepo;
    private $meteoRepo;


    public function __construct() {
        global $db_host, $db_user, $db_pw, $db_name, $jwt_secret, $jwt_issuer;
        require_once __DIR__ . "/../config.php";

        $this->dbService = MySqlDbService::getInstance();
        $this->dbService->init($db_host, $db_user, $db_pw, $db_name);
        $this->systemServiceFactory = new SystemServiceFactory();
        $this->flightrouteRepo = new DbFlightrouteRepo($this->dbService);
        $this->openAipRepoFactory = new DbOpenAipRepoFactory($this->dbService);
        $this->userRepoFactory = new DbUserRepoFactory($this->dbService);
        $this->tokenService = new TokenService($jwt_secret, $jwt_issuer);
        $this->geonameRepo = new DbGeonameRepo($this->dbService);
        $this->notamRepo = new DbNotamRepo($this->dbService);
        $this->terrainRepo = new FileTerrainRepo($this->systemServiceFactory->getFileService());
        $this->adsbexGateway = new AdsbexGateway($this->systemServiceFactory->getFileService());
        $this->ognGateway = new OgnGateway($this->systemServiceFactory);
        $this->trafficRepo = new DbTrafficRepo($this->dbService);
        $this->meteoRepo = new DbMeteoRepo($this->dbService, $this->systemServiceFactory);
    }


    public function __destruct() {
        if ($this->dbService->isOpen()) {
            $this->dbService->closeDb();
        }
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


    public function getUserRepoFactory(): IUserRepoFactory {
        return $this->userRepoFactory;
    }


    public function getTokenService(): TokenService {
        return $this->tokenService;
    }


    public function getGeonameRepo(): IGeonameRepo {
        return $this->geonameRepo;
    }


    public function getTerrainRepo(): ITerrainRepo {
        return $this->terrainRepo;
    }


    public function getNotamRepo(): INotamRepo {
        return $this->notamRepo;
    }


    public function getOpenAipRepoFactory(): IOpenAipRepoFactory {
        return $this->openAipRepoFactory;
    }

    
    public function getAdsbexGateway(): IAdsbexGateway {
        return $this->adsbexGateway;
    }

    
    public function getOgnGateway(): IOgnGateway {
        return $this->ognGateway;
    }


    public function getTrafficRepo(): ITrafficRepo {
        return $this->trafficRepo;
    }


    public function getMeteoRepo(): IMeteoRepo {
        return $this->meteoRepo;
    }
}
