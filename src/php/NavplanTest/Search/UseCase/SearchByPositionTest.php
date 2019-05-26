<?php declare(strict_types=1);

namespace NavplanTest\Search\UseCase;

use Navplan\Geometry\Domain\Position2d;
use Navplan\Search\Domain\SearchByPositionQuery;
use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\UseCase\SearchByPosition;
use NavplanTest\OpenAip\Mocks\AirspaceRepoMock;
use NavplanTest\OpenAip\Mocks\DummyAirspace1;
use NavplanTest\OpenAip\Mocks\DummyReportingPoint1;
use NavplanTest\OpenAip\Mocks\DummyReportingSector1;
use NavplanTest\OpenAip\Mocks\ReportingPointRepoMock;
use NavplanTest\Search\Mocks\SearchConfigMock;
use PHPUnit\Framework\TestCase;


class SearchByPositionTest extends TestCase {
    private $config;


    private function getConfig(): SearchConfigMock {
        return $this->config;
    }


    private function getAirspaceRepoMock(): AirspaceRepoMock {
        $repo = $this->getConfig()->getOpenAipRepoFactory()->createAirspaceRepo();
        return $repo instanceof AirspaceRepoMock ? $repo : NULL;
    }


    private function getReportingPointRepoMock(): ReportingPointRepoMock {
        $repo = $this->getConfig()->getOpenAipRepoFactory()->createReportingPointRepo();
        return $repo instanceof ReportingPointRepoMock ? $repo : NULL;
    }


    protected function setUp(): void {
        $this->config = new SearchConfigMock();
    }


    public function test_no_search_items_gives_emtpy_result() {
        $query = new SearchByPositionQuery(
            [],
            new Position2d(7.0, 47.0),
            0.5,
            "asdf@asef.com"
        );
        $result = SearchByPosition::search($query, $this->getConfig());
        $this->assertNotNull($result);
        $this->assertEquals(0, count($result->airports));
        $this->assertEquals(0, count($result->navaids));
        $this->assertEquals(0, count($result->airspaces));
        $this->assertEquals(0, count($result->reportingPoints));
        $this->assertEquals(0, count($result->userPoints));
        $this->assertEquals(0, count($result->webcams));
        $this->assertEquals(0, count($result->geonames));
        $this->assertEquals(0, count($result->notams));
    }


    public function test_search_only_in_reportingPoints() {
        $query = new SearchByPositionQuery(
            [SearchItemType::REPORTINGPOINTS],
            new Position2d(7.0, 47.0),
            0.5,
            "asdf@asef.com"
        );
        $airspaceResults = [ DummyAirspace1::create(), DummyAirspace1::create() ] ;
        $reportingPointResults = [ DummyReportingPoint1::create(), DummyReportingSector1::create() ];
        $this->getAirspaceRepoMock()->pushMockResult($airspaceResults);
        $this->getReportingPointRepoMock()->pushMockResult($reportingPointResults);

        $result = SearchByPosition::search($query, $this->getConfig());
        $this->assertNotNull($result);
        $this->assertEquals(count($reportingPointResults), count($result->reportingPoints));
        $this->assertEquals(0, count($result->airspaces));
    }
}
