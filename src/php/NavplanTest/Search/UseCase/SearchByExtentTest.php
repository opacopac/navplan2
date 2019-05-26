<?php declare(strict_types=1);

namespace NavplanTest\Search\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Search\Domain\SearchByExtentQuery;
use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\UseCase\SearchByExtent;
use NavplanTest\OpenAip\Mocks\AirportRepoMock;
use NavplanTest\OpenAip\Mocks\DummyAirport1;
use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use NavplanTest\OpenAip\Mocks\NavaidRepoMock;
use NavplanTest\Search\Mocks\SearchConfigMock;
use PHPUnit\Framework\TestCase;


class SearchByExtentTest extends TestCase {
    private $config;


    private function getConfig(): SearchConfigMock {
        return $this->config;
    }


    private function getAirportRepoMock(): AirportRepoMock {
        $repo = $this->getConfig()->getOpenAipRepoFactory()->createAirportRepo();
        return $repo instanceof AirportRepoMock ? $repo : NULL;
    }


    private function getNavaidRepoMock(): NavaidRepoMock {
        $repo = $this->getConfig()->getOpenAipRepoFactory()->createNavaidRepo();
        return $repo instanceof NavaidRepoMock ? $repo : NULL;
    }


    protected function setUp(): void {
        $this->config = new SearchConfigMock();
    }


    public function test_no_search_items_gives_emtpy_result() {
        $query = new SearchByExtentQuery(
            [],
            Extent::createFromCoords(7.0, 47.0, 7.9, 47.9),
            11,
            12345,
            12346,
            "asdf@asef.com"
        );
        $result = SearchByExtent::search($query, $this->getConfig());
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


    public function test_search_only_in_airports() {
        $query = new SearchByExtentQuery(
            [SearchItemType::AIRPORTS],
            Extent::createFromCoords(7.0, 47.0, 7.9, 47.9),
            11,
            12345,
            12346,
            "asdf@asef.com"
        );
        $airportResults = [ DummyAirport1::create(), DummyAirport1::create() ] ;
        $navaidResults = [ DummyNavaid1::create(), DummyNavaid1::create() ];
        $this->getAirportRepoMock()->pushMockResult($airportResults);
        $this->getNavaidRepoMock()->pushMockResult($navaidResults);

        $result = SearchByExtent::search($query, $this->getConfig());
        $this->assertNotNull($result);
        $this->assertEquals(count($airportResults), count($result->airports));
        $this->assertEquals(0, count($result->navaids));
    }
}
