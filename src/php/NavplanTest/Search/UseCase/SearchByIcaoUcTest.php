<?php declare(strict_types=1);

namespace NavplanTest\Search\UseCase;

use Navplan\Search\DomainModel\SearchByIcaoQuery;
use Navplan\Search\DomainModel\SearchItemType;
use Navplan\Search\UseCase\SearchByIcao\SearchByIcaoUc;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\OpenAip\Mocks\DummyAirport1;
use NavplanTest\OpenAip\Mocks\DummyReportingPoint1;
use NavplanTest\OpenAip\Mocks\DummyReportingSector1;
use NavplanTest\OpenAip\Mocks\MockAirportRepo;
use NavplanTest\OpenAip\Mocks\MockReportingPointRepo;
use PHPUnit\Framework\TestCase;


class SearchByIcaoUcTest extends TestCase {
    private MockAirportRepo $airportRepo;
    private MockReportingPointRepo $reportingPointRepo;
    private SearchByIcaoUc $searchByIcaoUc;


    protected function setUp(): void {
        $config = new MockNavplanDiContainer();
        $this->airportRepo = $config->airportRepo;
        $this->reportingPointRepo = $config->reportingPointRepo;
        $this->searchByIcaoUc = $config->getSearchByIcaoUc();
    }


    public function test_no_search_items_gives_emtpy_result() {
        $query = new SearchByIcaoQuery(
            [],
            ["LSZB", "LSZG"],
            12345,
            12346
        );
        $result = $this->searchByIcaoUc->search($query);
        $this->assertNotNull($result);
        $this->assertCount(0, $result->airports);
        $this->assertCount(0, $result->navaids);
        $this->assertCount(0, $result->airspaces);
        $this->assertCount(0, $result->reportingPoints);
        $this->assertCount(0, $result->userPoints);
        $this->assertCount(0, $result->webcams);
        $this->assertCount(0, $result->geonames);
        $this->assertCount(0, $result->notams);
    }


    public function test_search_only_in_reportingpoint() {
        $query = new SearchByIcaoQuery(
            [SearchItemType::REPORTINGPOINTS],
            ["LSZB", "LSZG"],
            12345,
            12346
        );
        $adResults = [ DummyAirport1::create() ];
        $this->airportRepo->pushMockResult($adResults);
        $rpResults = [ DummyReportingPoint1::create(), DummyReportingSector1::create() ] ;
        $this->reportingPointRepo->pushMockResult($rpResults);

        $result = $this->searchByIcaoUc->search($query);
        $this->assertNotNull($result);
        $this->assertSameSize($rpResults, $result->reportingPoints);
        $this->assertCount(0, $result->airports);
    }
}
