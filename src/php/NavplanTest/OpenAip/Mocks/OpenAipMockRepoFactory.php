<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Mocks;

use Navplan\OpenAip\UseCase\IAirportSearch;
use Navplan\OpenAip\UseCase\IAirspaceSearch;
use Navplan\OpenAip\UseCase\INavaidSearch;
use Navplan\OpenAip\UseCase\IOpenAipRepoFactory;
use Navplan\OpenAip\UseCase\IReportingPointSearch;
use Navplan\OpenAip\UseCase\IWebcamSearch;


class OpenAipMockRepoFactory implements IOpenAipRepoFactory {
    private $airportRepoMock;
    private $airspaceRepoMock;
    private $navaidRepoMock;
    private $reportingPointRepoMock;
    private $webcamRepoMock;


    public function __construct() {
        $this->airportRepoMock = new AirportSearchMock();
        $this->airspaceRepoMock = new AirspaceSearchMock();
        $this->navaidRepoMock = new NavaidSearchMock();
        $this->reportingPointRepoMock = new ReportingPointSearchMock();
        $this->webcamRepoMock = new WebcamSearchMock();
    }


    public function createAirportSearch(): IAirportSearch {
        return $this->airportRepoMock;
    }


    public function createAirspaceSearch(): IAirspaceSearch {
        return $this->airspaceRepoMock;
    }


    public function createNavaidSearch(): INavaidSearch {
        return $this->navaidRepoMock;
    }


    public function createReportingPointSearch(): IReportingPointSearch {
        return $this->reportingPointRepoMock;
    }


    public function createWebcamSearch(): IWebcamSearch {
        return $this->webcamRepoMock;
    }
}
