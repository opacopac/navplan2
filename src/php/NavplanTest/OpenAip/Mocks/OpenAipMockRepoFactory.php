<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Mocks;

use Navplan\OpenAip\IRepo\IAirportRepo;
use Navplan\OpenAip\IRepo\IAirspaceRepo;
use Navplan\OpenAip\IRepo\INavaidRepo;
use Navplan\OpenAip\IRepo\IOpenAipRepoFactory;
use Navplan\OpenAip\IRepo\IReportingPointRepo;
use Navplan\OpenAip\IRepo\IWebcamRepo;


class OpenAipMockRepoFactory implements IOpenAipRepoFactory {
    private $airportRepoMock;
    private $airspaceRepoMock;
    private $navaidRepoMock;
    private $reportingPointRepoMock;
    private $webcamRepoMock;


    public function __construct() {
        $this->airportRepoMock = new AirportRepoMock();
        $this->airspaceRepoMock = new AirspaceRepoMock();
        $this->navaidRepoMock = new NavaidRepoMock();
        $this->reportingPointRepoMock = new ReportingPointRepoMock();
        $this->webcamRepoMock = new WebcamRepoMock();
    }


    public function createAirportRepo(): IAirportRepo {
        return $this->airportRepoMock;
    }


    public function createAirspaceRepo(): IAirspaceRepo {
        return $this->airspaceRepoMock;
    }


    public function createNavaidRepo(): INavaidRepo {
        return $this->navaidRepoMock;
    }


    public function createReportingPointRepo(): IReportingPointRepo {
        return $this->reportingPointRepoMock;
    }


    public function createWebcamRepo(): IWebcamRepo {
        return $this->webcamRepoMock;
    }
}
