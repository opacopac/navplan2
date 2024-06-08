<?php declare(strict_types=1);

namespace NavplanTest;

require_once __DIR__ . "/../config_test.php";

use Navplan\Aerodrome\Domain\Service\IAirportRepo;
use Navplan\Aerodrome\Domain\Service\IReportingPointRepo;
use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\Flightroute\Domain\Service\IFlightrouteRepo;
use Navplan\Geoname\Domain\Service\IGeonameRepo;
use Navplan\MeteoSma\Domain\Service\IMeteoSmaRepo;
use Navplan\Navaid\Domain\Service\INavaidService;
use Navplan\Notam\Domain\Service\INotamRepo;
use Navplan\ProdNavplanDiContainer;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\IMailService;
use Navplan\System\Domain\Service\IProcService;
use Navplan\System\Domain\Service\ITimeService;
use Navplan\Terrain\Domain\Service\ITerrainRepo;
use Navplan\Traffic\Domain\Service\IAdsbexService;
use Navplan\Traffic\Domain\Service\IOgnService;
use Navplan\Traffic\Domain\Service\ITrafficDetailRepo;
use Navplan\User\Domain\Service\IUserPointRepo;
use Navplan\User\Domain\Service\IUserRepo;
use Navplan\Webcam\Domain\Service\IWebcamRepo;
use NavplanTest\Aerodrome\Mocks\MockAirportRepo;
use NavplanTest\Aerodrome\Mocks\MockReportingPointRepo;
use NavplanTest\Airspace\Mocks\MockAirspaceService;
use NavplanTest\Flightroute\Mocks\MockFlightrouteRepo;
use NavplanTest\Geoname\Mocks\MockGeonameRepo;
use NavplanTest\MeteoSma\Mocks\MockMeteoSmaRepo;
use NavplanTest\Navaid\Mocks\MockNavaidService;
use NavplanTest\Notam\Mocks\MockNotamRepo;
use NavplanTest\System\Mock\MockDbService;
use NavplanTest\System\Mock\MockFileService;
use NavplanTest\System\Mock\MockHttpService;
use NavplanTest\System\Mock\MockMailService;
use NavplanTest\System\Mock\MockProcService;
use NavplanTest\System\Mock\MockTimeService;
use NavplanTest\Terrain\Mocks\MockTerrainRepo;
use NavplanTest\Traffic\Mocks\MockAdsbexService;
use NavplanTest\Traffic\Mocks\MockOgnService;
use NavplanTest\Traffic\Mocks\MockTrafficDetailRepo;
use NavplanTest\User\Mocks\MockUserPointRepo;
use NavplanTest\User\Mocks\MockUserRepo;
use NavplanTest\User\Mocks\MockUserRepoFactory;
use NavplanTest\Webcam\Mocks\MockWebcamRepo;


class MockNavplanDiContainer extends ProdNavplanDiContainer {
    // system
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
    public MockMeteoSmaRepo $meteoService;
    // notam
    public MockNotamRepo $notamService;
    // open aip
    public MockAirportRepo $airportRepo;
    public MockAirspaceService $airspaceService;
    public MockNavaidService $navaidService;
    public MockReportingPointRepo $reportingPointRepo;
    public MockWebcamRepo $webcamDiContainer;
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

        $this->httpService = new MockHttpService();
        $this->fileService = new MockFileService();
        $this->mailService = new MockMailService();
        $this->timeService = new MockTimeService();
        $this->procService = new MockProcService();
        $this->dbService = new MockDbService();
        $this->flightrouteRepo = new MockFlightrouteRepo();
        $this->geonameRepo = new MockGeonameRepo();
        $this->meteoService = new MockMeteoSmaRepo();
        $this->notamService = new MockNotamRepo();
        $this->airportRepo = new MockAirportRepo();
        $this->airspaceService = new MockAirspaceService();
        $this->navaidService = new MockNavaidService();
        $this->reportingPointRepo = new MockReportingPointRepo();
        $this->webcamDiContainer = new MockWebcamRepo();
        $this->terrainRepo = new MockTerrainRepo();
        $this->adsbexRepo = new MockAdsbexService();
        $this->ognRepo = new MockOgnService();
        $this->trafficDetailRepo = new MockTrafficDetailRepo();
        $this->userRepoFactory = new MockUserRepoFactory();
        $this->userRepo = $this->userRepoFactory->createUserRepo();
        $this->userPointRepo = $this->userRepoFactory->createUserPointRepo();
    }


    // region system

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

    public function getMeteoRepo(): IMeteoSmaRepo {
        return $this->meteoService;
    }

    // endregion


    // region notam

    public function getNotamService(): INotamRepo {
        return $this->notamService;
    }

    // endregion


    // region open aip

    public function getAirportRepo(): IAirportRepo {
        return $this->airportRepo;
    }


    public function getAirspaceService(): IAirspaceService {
        return $this->airspaceService;
    }


    public function getNavaidService(): INavaidService {
        return $this->navaidService;
    }


    public function getReportingPointRepo(): IReportingPointRepo {
        return $this->reportingPointRepo;
    }


    public function getWebcamDiContainer(): IWebcamRepo {
        return $this->webcamDiContainer;
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
