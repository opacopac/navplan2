<?php declare(strict_types=1);

namespace Navplan\Flightroute;

// show errors on web page
// error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once __DIR__ . "/../../Autoloader.php";

use Navplan\Db\DbConfigProd;
use Navplan\Db\IDb\IDbService;
use Navplan\Flightroute\UseCase\IFlightrouteConfig;
use Navplan\Flightroute\UseCase\IFlightrouteRepoFactory;
use Navplan\OpenAip\DbRepo\DbFlightrouteRepoFactory;
use Navplan\System\IHttpResponseService;
use Navplan\System\SystemConfigProd;
use Navplan\User\DbRepo\DbUserRepoFactory;
use Navplan\User\UseCase\IUserRepoFactory;


class FlightrouteConfigProd implements IFlightrouteConfig {
    private $dbConfig;
    private $systemConfig;
    private $flightrouteRepoFactory;
    private $userRepoFactory;


    public function __construct() {
        $this->dbConfig = new DbConfigProd();
        $this->systemConfig = new SystemConfigProd();
        $this->flightrouteRepoFactory = new DbFlightrouteRepoFactory($this->getDbService());
        $this->userRepoFactory = new DbUserRepoFactory($this->getDbService());
    }


    public function getDbService(): IDbService {
        return $this->dbConfig->getDbService();
    }


    public function getHttpResponseService(): IHttpResponseService {
        return $this->systemConfig->getHttpResponseService();
    }


    public function getFlightrouteRepoFactory(): IFlightrouteRepoFactory {
        return $this->flightrouteRepoFactory;
    }


    public function getUserRepoFactory(): IUserRepoFactory {
        return $this->userRepoFactory;
    }
}
