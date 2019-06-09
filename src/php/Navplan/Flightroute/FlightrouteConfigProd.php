<?php declare(strict_types=1);

namespace Navplan\Flightroute;

// show errors on web page
// error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once __DIR__ . "/../../Autoloader.php";

use Navplan\Db\DbConfigProd;
use Navplan\Flightroute\DbRepo\DbFlightrouteRepo;
use Navplan\Flightroute\UseCase\IFlightrouteConfig;
use Navplan\Flightroute\UseCase\IFlightrouteRepo;
use Navplan\System\SystemConfigProd;
use Navplan\System\UseCase\ISystemServiceFactory;
use Navplan\User\DbRepo\DbUserRepoFactory;
use Navplan\User\UseCase\IUserRepoFactory;


class FlightrouteConfigProd implements IFlightrouteConfig {
    private $systemServiceFactory;
    private $flightrouteRepo;
    private $userRepoFactory;


    public function __construct() {
        $dbConfig = new DbConfigProd();
        $systemConfig = new SystemConfigProd();
        $this->systemServiceFactory = $systemConfig->getSystemServiceFactory();
        $this->flightrouteRepo = new DbFlightrouteRepo($dbConfig->getDbService());
        $this->userRepoFactory = new DbUserRepoFactory($dbConfig->getDbService());
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
}
