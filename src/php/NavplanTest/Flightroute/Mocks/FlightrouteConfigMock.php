<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Mocks;

require_once __DIR__ . "/../../../config_test.php";

use Navplan\Flightroute\UseCase\IFlightrouteConfig;
use Navplan\Flightroute\UseCase\IFlightrouteRepo;
use Navplan\System\UseCase\ISystemServiceFactory;
use Navplan\User\UseCase\IUserRepoFactory;
use NavplanTest\Db\Mock\MockDbService;
use NavplanTest\System\Mock\MockSystemServiceFactory;
use NavplanTest\User\Mocks\MockUserRepoFactory;


class FlightrouteConfigMock implements IFlightrouteConfig {
    private $dbService;
    private $systemServiceFactory;
    private $flightrouteRepo;
    private $userRepoFactory;


    public function __construct() {
        $this->dbService = new MockDbService();
        $this->systemServiceFactory = new MockSystemServiceFactory();
        $this->flightrouteRepo = new MockFlightrouteRepo();
        $this->userRepoFactory = new MockUserRepoFactory();
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
