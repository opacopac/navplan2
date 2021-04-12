<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Mocks;

use Navplan\OpenAip\DomainService\IOpenAipRepoFactory;


class MockOpenAipRepoFactory implements IOpenAipRepoFactory {
    private MockAirportRepo $airportRepoMock;
    private MockAirspaceRepo $airspaceRepoMock;
    private MockNavaidRepo $navaidRepoMock;
    private MockReportingPointRepo $reportingPointRepoMock;
    private MockWebcamRepo $webcamRepoMock;


    public function __construct() {
        $this->airportRepoMock = new MockAirportRepo();
        $this->airspaceRepoMock = new MockAirspaceRepo();
        $this->navaidRepoMock = new MockNavaidRepo();
        $this->reportingPointRepoMock = new MockReportingPointRepo();
        $this->webcamRepoMock = new MockWebcamRepo();
    }


    public function createAirportRepo(): MockAirportRepo {
        return $this->airportRepoMock;
    }


    public function createAirspaceRepo(): MockAirspaceRepo {
        return $this->airspaceRepoMock;
    }


    public function createNavaidRepo(): MockNavaidRepo {
        return $this->navaidRepoMock;
    }


    public function createReportingPointRepo(): MockReportingPointRepo {
        return $this->reportingPointRepoMock;
    }


    public function createWebcamRepo(): MockWebcamRepo {
        return $this->webcamRepoMock;
    }
}
