<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Mocks;

require_once __DIR__ . "/../../../config_test.php";

use Navplan\Flightroute\UseCase\IFlightrouteConfig;
use Navplan\Flightroute\UseCase\IFlightrouteRepo;
use Navplan\System\IFileService;
use Navplan\System\IHttpService;
use Navplan\System\IMailService;
use Navplan\User\UseCase\IUserRepoFactory;
use NavplanTest\Db\Mock\MockDbService;
use NavplanTest\System\Mock\MockFileService;
use NavplanTest\System\Mock\MockHttpService;
use NavplanTest\System\Mock\MockMailService;
use NavplanTest\User\Mocks\MockUserRepoFactory;


class FlightrouteConfigMock implements IFlightrouteConfig {
    private $dbService;
    private $mailService;
    private $fileService;
    private $httpService;
    private $flightrouteRepo;
    private $userRepoFactory;


    public function __construct() {
        $this->dbService = new MockDbService();
        $this->mailService = new MockMailService();
        $this->fileService = new MockFileService();
        $this->httpService = new MockHttpService();
        $this->flightrouteRepo = new MockFlightrouteRepo();
        $this->userRepoFactory = new MockUserRepoFactory();
    }


    public function getMailService(): IMailService {
        return $this->mailService;
    }


    public function getFileService(): IFileService {
        return $this->fileService;
    }


    public function getHttpService(): IHttpService {
        return $this->httpService;
    }


    public function getFlightrouteRepo(): IFlightrouteRepo {
        return $this->flightrouteRepo;
    }


    public function getUserRepoFactory(): IUserRepoFactory {
        return $this->userRepoFactory;
    }
}
