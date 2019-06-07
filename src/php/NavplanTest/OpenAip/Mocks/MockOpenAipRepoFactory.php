<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Mocks;

use Navplan\OpenAip\UseCase\IAirportRepo;
use Navplan\OpenAip\UseCase\IAirspaceRepo;
use Navplan\OpenAip\UseCase\INavaidRepo;
use Navplan\OpenAip\UseCase\IOpenAipRepoFactory;
use Navplan\OpenAip\UseCase\IReportingPointRepo;
use Navplan\OpenAip\UseCase\IWebcamRepo;


class MockOpenAipRepoFactory implements IOpenAipRepoFactory {
    private $airportRepoMock;
    private $airspaceRepoMock;
    private $navaidRepoMock;
    private $reportingPointRepoMock;
    private $webcamRepoMock;


    public function __construct() {
        $this->airportRepoMock = new MockAirportRepo();
        $this->airspaceRepoMock = new MockAirspaceRepo();
        $this->navaidRepoMock = new MockNavaidRepo();
        $this->reportingPointRepoMock = new MockReportingPointRepo();
        $this->webcamRepoMock = new MockWebcamRepo();
    }


    public function createAirportSearch(): IAirportRepo {
        return $this->airportRepoMock;
    }


    public function createAirspaceSearch(): IAirspaceRepo {
        return $this->airspaceRepoMock;
    }


    public function createNavaidSearch(): INavaidRepo {
        return $this->navaidRepoMock;
    }


    public function createReportingPointSearch(): IReportingPointRepo {
        return $this->reportingPointRepoMock;
    }


    public function createWebcamSearch(): IWebcamRepo {
        return $this->webcamRepoMock;
    }
}
