<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Mocks;

require_once __DIR__ . "/../../../config_test.php";

use Navplan\Flightroute\UseCase\IFlightrouteConfig;
use Navplan\Flightroute\UseCase\IFlightrouteRepoFactory;
use Navplan\Db\IDb\IDbService;
use Navplan\System\IMailService;
use Navplan\System\IHttpResponseService;
use Navplan\User\UseCase\IUserRepoFactory;
use NavplanTest\Db\Mock\DbServiceMock;
use NavplanTest\System\Mock\HttpResponseServiceMock;
use NavplanTest\System\Mock\MailServiceMock;
use NavplanTest\User\Mocks\UserMockRepoFactory;


class FlightrouteConfigMock implements IFlightrouteConfig {
    private $dbService;
    private $mailService;
    private $httpResponseService;
    private $flightrouteRepoFactory;
    private $userRepoFactory;


    public function __construct() {
        $this->dbService = new DbServiceMock();
        $this->mailService = new MailServiceMock();
        $this->httpResponseService = new HttpResponseServiceMock();
        $this->flightrouteRepoFactory = new FlightrouteMockRepoFactory();
        $this->userRepoFactory = new UserMockRepoFactory();
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


    public function getFlightrouteRepoFactory(): IFlightrouteRepoFactory {
        return $this->flightrouteRepoFactory;
    }


    public function getUserRepoFactory(): IUserRepoFactory {
        return $this->userRepoFactory;
    }
}
