<?php declare(strict_types=1);

namespace Navplan;

// show errors on web page
// error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once __DIR__ . "/../Autoloader.php";

use Navplan\Db\DbConfigProd;
use Navplan\Flightroute\DbRepo\DbFlightrouteRepo;
use Navplan\Flightroute\UseCase\IFlightrouteConfig;
use Navplan\Flightroute\UseCase\IFlightrouteRepo;
use Navplan\Geoname\DbRepo\DbGeonameRepo;
use Navplan\Geoname\UseCase\IGeonameConfig;
use Navplan\Geoname\UseCase\IGeonameRepo;
use Navplan\Notam\DbRepo\DbNotamRepo;
use Navplan\Notam\UseCase\INotamConfig;
use Navplan\Notam\UseCase\INotamRepo;
use Navplan\OpenAip\DbRepo\DbOpenAipRepoFactory;
use Navplan\OpenAip\UseCase\IOpenAipConfig;
use Navplan\Search\UseCase\ISearchConfig;
use Navplan\System\SystemServiceFactory;
use Navplan\OpenAip\UseCase\IOpenAipRepoFactory;
use Navplan\System\SystemConfigProd;
use Navplan\System\UseCase\ISystemConfig;
use Navplan\System\UseCase\ISystemServiceFactory;
use Navplan\Terrain\FileRepo\FileTerrainRepo;
use Navplan\Terrain\UseCase\ITerrainConfig;
use Navplan\Terrain\UseCase\ITerrainRepo;
use Navplan\Traffic\AdsbexGateway\AdsbexGateway;
use Navplan\Traffic\OgnGateway\OgnGateway;
use Navplan\Traffic\UseCase\IAdsbexGateway;
use Navplan\Traffic\UseCase\IOgnGateway;
use Navplan\Traffic\UseCase\ITrafficConfig;
use Navplan\User\DbRepo\DbUserRepoFactory;
use Navplan\User\UseCase\IUserConfig;
use Navplan\User\UseCase\IUserRepoFactory;


class NavplanConfigProd implements ISystemConfig, ITerrainConfig, IUserConfig, IFlightrouteConfig, IGeonameConfig,
    INotamConfig, IOpenAipConfig, ISearchConfig, ITrafficConfig {
    private $systemServiceFactory;
    private $flightrouteRepo;
    private $userRepoFactory;
    private $openAipRepoFactory;
    private $geonameRepo;
    private $notamRepo;
    private $terrainRepo;
    private $adsbexGateway;
    private $ognGateway;


    public function __construct() {
        $dbConfig = new DbConfigProd();
        $systemConfig = new SystemConfigProd();
        $this->systemServiceFactory = new SystemServiceFactory();
        $this->flightrouteRepo = new DbFlightrouteRepo($dbConfig->getDbService());
        $this->openAipRepoFactory = new DbOpenAipRepoFactory($dbConfig->getDbService());
        $this->userRepoFactory = new DbUserRepoFactory($dbConfig->getDbService());
        $this->geonameRepo = new DbGeonameRepo($dbConfig->getDbService());
        $this->notamRepo = new DbNotamRepo($dbConfig->getDbService());
        $this->terrainRepo = new FileTerrainRepo($systemConfig->getSystemServiceFactory()->getFileService());
        $this->adsbexGateway = new AdsbexGateway($systemConfig->getSystemServiceFactory()->getFileService());
        $this->ognGateway = new OgnGateway($systemConfig->getSystemServiceFactory());
    }
    
    
    public function getSystemServiceFactory(): ISystemServiceFactory {
        return $this->systemServiceFactory;
    }
    
    
    public function getFlightrouteRepo(): IFlightrouteRepo {
        return $this->flightrouteRepo;
    }


    public function getUserRepoFactory(): IUserRepoFactory {
        return $this->userRepoFactory;
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
}
