<?php declare(strict_types=1);

namespace NavplanTest;

require_once __DIR__ . "/../config_test.php";

use Navplan\Db\DomainService\IDbService;
use Navplan\Flightroute\DomainService\IFlightrouteRepo;
use Navplan\Geoname\DomainService\IGeonameRepo;
use Navplan\MeteoSma\DomainService\IMeteoRepo;
use Navplan\Notam\DomainService\INotamRepo;
use Navplan\OpenAip\DomainService\IAirportRepo;
use Navplan\OpenAip\DomainService\IAirspaceRepo;
use Navplan\OpenAip\DomainService\INavaidRepo;
use Navplan\OpenAip\DomainService\IReportingPointRepo;
use Navplan\OpenAip\DomainService\IWebcamRepo;
use Navplan\System\DomainService\IFileService;
use Navplan\System\DomainService\IHttpService;
use Navplan\System\DomainService\IMailService;
use Navplan\System\DomainService\IProcService;
use Navplan\System\DomainService\ISystemServiceFactory;
use Navplan\System\DomainService\ITimeService;
use Navplan\Terrain\DomainService\ITerrainRepo;
use Navplan\Traffic\DomainService\IAdsbexService;
use Navplan\Traffic\DomainService\IOgnService;
use Navplan\Traffic\DomainService\ITrafficDetailRepo;
use Navplan\User\DomainService\IUserPointRepo;
use Navplan\User\DomainService\IUserRepo;
use NavplanTest\Db\Mock\MockDbService;
use NavplanTest\Flightroute\Mocks\MockFlightrouteRepo;
use NavplanTest\Geoname\Mocks\MockGeonameRepo;
use NavplanTest\MeteoSma\Mocks\MockMeteoRepo;
use NavplanTest\Notam\Mocks\MockNotamRepo;
use NavplanTest\OpenAip\Mocks\MockAirportRepo;
use NavplanTest\OpenAip\Mocks\MockAirspaceRepo;
use NavplanTest\OpenAip\Mocks\MockNavaidRepo;
use NavplanTest\OpenAip\Mocks\MockOpenAipRepoFactory;
use NavplanTest\OpenAip\Mocks\MockReportingPointRepo;
use NavplanTest\OpenAip\Mocks\MockWebcamRepo;
use NavplanTest\System\Mock\MockFileService;
use NavplanTest\System\Mock\MockHttpService;
use NavplanTest\System\Mock\MockMailService;
use NavplanTest\System\Mock\MockProcService;
use NavplanTest\System\Mock\MockSystemServiceFactory;
use NavplanTest\System\Mock\MockTimeService;
use NavplanTest\Terrain\Mocks\MockTerrainRepo;
use NavplanTest\Traffic\Mocks\MockAdsbexService;
use NavplanTest\Traffic\Mocks\MockOgnService;
use NavplanTest\Traffic\Mocks\MockTrafficDetailRepo;
use NavplanTest\User\Mocks\MockUserPointRepo;
use NavplanTest\User\Mocks\MockUserRepo;
use NavplanTest\User\Mocks\MockUserRepoFactory;


class MockNavplanDiContainer extends ProdNavplanDiContainer {
    // system
    public MockSystemServiceFactory $systemServiceFactory;
    public MockHttpService $httpService;
    public MockFileService $fileService;
    public MockMailService $mailService;
    public MockTimeService $timeService;
    public MockProcService $procService;
    // db
    public MockDbService $dbService;
    // flightroute
    public MockFlightrouteRepo $flightrouteRepo;
    // geoname
    public MockGeonameRepo $geonameRepo;
    // meteo sma
    public MockMeteoRepo $meteoRepo;
    // notam
    public MockNotamRepo $notamRepo;
    // open aip
    public MockOpenAipRepoFactory $openAipRepoFactory;
    public MockAirportRepo $airportRepo;
    public MockAirspaceRepo $airspaceRepo;
    public MockNavaidRepo $navaidRepo;
    public MockReportingPointRepo $reportingPointRepo;
    public MockWebcamRepo $webcamRepo;
    // terrain
    public MockTerrainRepo $terrainRepo;
    // traffic
    public MockAdsbexService $adsbexRepo;
    public MockOgnService $ognRepo;
    public MockTrafficDetailRepo $trafficDetailRepo;
    // user
    public MockUserRepoFactory $userRepoFactory;
    public MockUserRepo $userRepo;
    public MockUserPointRepo $userPointRepo;


    public function __construct() {
        parent::__construct();

        $this->systemServiceFactory = new MockSystemServiceFactory();
        $this->httpService = $this->systemServiceFactory->getHttpService();
        $this->fileService = $this->systemServiceFactory->getFileService();
        $this->mailService = $this->systemServiceFactory->getMailService();
        $this->timeService = $this->systemServiceFactory->getTimeService();
        $this->procService = $this->systemServiceFactory->getProcService();
        $this->dbService = new MockDbService();
        $this->flightrouteRepo = new MockFlightrouteRepo();
        $this->geonameRepo = new MockGeonameRepo();
        $this->meteoRepo = new MockMeteoRepo();
        $this->notamRepo = new MockNotamRepo();
        $this->openAipRepoFactory = new MockOpenAipRepoFactory();
        $this->airportRepo = $this->openAipRepoFactory->createAirportRepo();
        $this->airspaceRepo = $this->openAipRepoFactory->createAirspaceRepo();
        $this->navaidRepo = $this->openAipRepoFactory->createNavaidRepo();
        $this->reportingPointRepo = $this->openAipRepoFactory->createReportingPointRepo();
        $this->webcamRepo = $this->openAipRepoFactory->createWebcamRepo();
        $this->terrainRepo = new MockTerrainRepo();
        $this->adsbexRepo = new MockAdsbexService();
        $this->ognRepo = new MockOgnService();
        $this->trafficDetailRepo = new MockTrafficDetailRepo();
        $this->userRepoFactory = new MockUserRepoFactory();
        $this->userRepo = $this->userRepoFactory->createUserRepo();
        $this->userPointRepo = $this->userRepoFactory->createUserPointRepo();
    }


    // region system

    public function getSystemServiceFactory(): ISystemServiceFactory {
        return $this->systemServiceFactory;
    }


    public function getHttpService(): IHttpService {
        return $this->httpService;
    }


    public function getFileService(): IFileService {
        return $this->fileService;
    }


    public function getMailService(): IMailService {
        return $this->mailService;
    }


    public function getTimeService(): ITimeService {
        return $this->timeService;
    }


    public function getProcService(): IProcService {
        return $this->procService;
    }

    // endregion


    // region db

    public function getDbService(): IDbService {
        return $this->dbService;
    }

    // endregion


    // region flightroute

    public function getFlightrouteRepo(): IFlightrouteRepo {
        return $this->flightrouteRepo;
    }

    // endregion


    // region geoname

    function getGeonameRepo(): IGeonameRepo {
        return $this->geonameRepo;
    }

    // endregion


    // region meteo sma

    public function getMeteoRepo(): IMeteoRepo {
        return $this->meteoRepo;
    }

    // endregion


    // region notam

    public function getNotamRepo(): INotamRepo {
        return $this->notamRepo;
    }

    // endregion


    // region open aip

    public function getAirportRepo(): IAirportRepo {
        return $this->airportRepo;
    }


    public function getAirspaceRepo(): IAirspaceRepo {
        return $this->airspaceRepo;
    }


    public function getNavaidRepo(): INavaidRepo {
        return $this->navaidRepo;
    }


    public function getReportingPointRepo(): IReportingPointRepo {
        return $this->reportingPointRepo;
    }


    public function getWebcamRepo(): IWebcamRepo {
        return $this->webcamRepo;
    }

    // endregion


    // region terrain

    function getTerrainRepo(): ITerrainRepo {
        return $this->terrainRepo;
    }

    // endregion


    // region traffic

    public function getAdsbexRepo(): IAdsbexService {
        return $this->adsbexRepo;
    }


    public function getOgnRepo(): IOgnService {
        return $this->ognRepo;
    }


    public function getTrafficDetailRepo(): ITrafficDetailRepo {
        return $this->trafficDetailRepo;
    }

    // endregion


    // region user

    public function getUserRepo(): IUserRepo {
        return $this->userRepo;
    }


    public function getUserPointRepo(): IUserPointRepo {
        return $this->userPointRepo;
    }

    // endregion
}