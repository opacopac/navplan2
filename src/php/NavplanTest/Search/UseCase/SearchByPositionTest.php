<?php declare(strict_types=1);

namespace NavplanTest\Search\UseCase;

use Navplan\Geometry\Domain\Position2d;
use Navplan\Search\Domain\SearchByPositionQuery;
use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\UseCase\SearchByPosition;
use Navplan\User\UseCase\UserHelper;
use NavplanTest\OpenAip\Mocks\AirspaceSearchMock;
use NavplanTest\OpenAip\Mocks\DummyAirspace1;
use NavplanTest\OpenAip\Mocks\DummyReportingPoint1;
use NavplanTest\OpenAip\Mocks\DummyReportingSector1;
use NavplanTest\OpenAip\Mocks\ReportingPointSearchMock;
use NavplanTest\Search\Mocks\SearchConfigMock;
use NavplanTest\User\Mocks\DummyUserPoint1;
use NavplanTest\User\Mocks\DummyUserPoint2;
use NavplanTest\User\Mocks\UserPointRepoMock;
use PHPUnit\Framework\TestCase;


// TODO: inject with config
require_once __DIR__ . "/../../../config_test.php";


class SearchByPositionTest extends TestCase {
    private $config;


    private function getConfig(): SearchConfigMock {
        return $this->config;
    }


    private function getAirspaceRepoMock(): AirspaceSearchMock {
        $repo = $this->getConfig()->getOpenAipRepoFactory()->createAirspaceSearch();
        return $repo instanceof AirspaceSearchMock ? $repo : NULL;
    }


    private function getReportingPointRepoMock(): ReportingPointSearchMock {
        $repo = $this->getConfig()->getOpenAipRepoFactory()->createReportingPointSearch();
        return $repo instanceof ReportingPointSearchMock ? $repo : NULL;
    }


    private function getUserPointRepoMock(): UserPointRepoMock {
        $repo = $this->getConfig()->getUserRepoFactory()->createUserPointRepo();
        return $repo instanceof UserPointRepoMock ? $repo : NULL;
    }


    protected function setUp(): void {
        $this->config = new SearchConfigMock();
    }


    public function test_no_search_items_gives_emtpy_result() {
        $query = new SearchByPositionQuery(
            [],
            new Position2d(7.0, 47.0),
            0.5,
            1558977934,
            1559977934,
            UserHelper::createToken("asdf@asef.com", FALSE)
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
            1558977934,
            1559977934,
            UserHelper::createToken("asdf@asef.com", FALSE)
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


    public function test_search_no_token_no_userpoints() {
        $query = new SearchByPositionQuery(
            [SearchItemType::USERPOINTS],
            new Position2d(7.0, 47.0),
            0.5,
            1558977934,
            1559977934,
            NULL
        );
        $upResults = [ DummyUserPoint1::create(), DummyUserPoint2::create() ];
        $this->getUserPointRepoMock()->pushMockResult($upResults);

        $result = SearchByPosition::search($query, $this->getConfig());
        $this->assertNotNull($result);
        $this->assertEquals(0, count($result->userPoints));
    }
}
