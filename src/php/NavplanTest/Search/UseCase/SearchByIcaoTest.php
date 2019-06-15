<?php declare(strict_types=1);

namespace NavplanTest\Search\UseCase;

use Navplan\Search\Domain\SearchByIcaoQuery;
use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\UseCase\SearchByIcao;
use NavplanTest\MockNavplanConfig;
use NavplanTest\OpenAip\Mocks\MockAirportRepo;
use NavplanTest\OpenAip\Mocks\DummyAirport1;
use NavplanTest\OpenAip\Mocks\DummyReportingPoint1;
use NavplanTest\OpenAip\Mocks\DummyReportingSector1;
use NavplanTest\OpenAip\Mocks\MockReportingPointRepo;
use NavplanTest\User\Mocks\MockUserPointRepo;
use PHPUnit\Framework\TestCase;


class SearchByIcaoTest extends TestCase {
    private $config;


    private function getConfig(): MockNavplanConfig {
        return $this->config;
    }


    private function getAirportRepoMock(): MockAirportRepo {
        $repo = $this->getConfig()->getOpenAipRepoFactory()->createAirportRepo();
        return $repo instanceof MockAirportRepo ? $repo : NULL;
    }


    private function getReportingPointRepoMock(): MockReportingPointRepo {
        $repo = $this->getConfig()->getOpenAipRepoFactory()->createReportingPointRepo();
        return $repo instanceof MockReportingPointRepo ? $repo : NULL;
    }


    private function getUserPointRepoMock(): MockUserPointRepo {
        $repo = $this->getConfig()->getUserRepoFactory()->createUserPointRepo();
        return $repo instanceof MockUserPointRepo ? $repo : NULL;
    }


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
    }


    public function test_no_search_items_gives_emtpy_result() {
        $query = new SearchByIcaoQuery(
            [],
            ["LSZB", "LSZG"],
            12345,
            12346
        );
        $result = SearchByIcao::search($query, $this->getConfig());
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


    public function test_search_only_in_reportingpoint() {
        $query = new SearchByIcaoQuery(
            [SearchItemType::REPORTINGPOINTS],
            ["LSZB", "LSZG"],
            12345,
            12346
        );
        $adResults = [ DummyAirport1::create() ];
        $this->getAirportRepoMock()->pushMockResult($adResults);
        $rpResults = [ DummyReportingPoint1::create(), DummyReportingSector1::create() ] ;
        $this->getReportingPointRepoMock()->pushMockResult($rpResults);

        $result = SearchByIcao::search($query, $this->getConfig());
        $this->assertNotNull($result);
        $this->assertEquals(count($rpResults), count($result->reportingPoints));
        $this->assertEquals(0, count($result->airports));
    }
}