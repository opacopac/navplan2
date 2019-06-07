<?php declare(strict_types=1);

namespace NavplanTest\Search\UseCase;

use Navplan\Geometry\Domain\Extent;
use Navplan\Search\Domain\SearchByExtentQuery;
use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\UseCase\SearchByExtent;
use Navplan\User\UseCase\UserHelper;
use NavplanTest\OpenAip\Mocks\MockAirportRepo;
use NavplanTest\OpenAip\Mocks\DummyAirport1;
use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use NavplanTest\OpenAip\Mocks\MockNavaidRepo;
use NavplanTest\Search\Mocks\MockSearchConfig;
use NavplanTest\User\Mocks\DummyUserPoint1;
use NavplanTest\User\Mocks\DummyUserPoint2;
use NavplanTest\User\Mocks\MockUserPointRepo;
use PHPUnit\Framework\TestCase;


class SearchByExtentTest extends TestCase {
    private $config;


    private function getConfig(): MockSearchConfig {
        return $this->config;
    }


    private function getAirportRepoMock(): MockAirportRepo {
        $repo = $this->getConfig()->getOpenAipRepoFactory()->createAirportSearch();
        return $repo instanceof MockAirportRepo ? $repo : NULL;
    }


    private function getNavaidRepoMock(): MockNavaidRepo {
        $repo = $this->getConfig()->getOpenAipRepoFactory()->createNavaidSearch();
        return $repo instanceof MockNavaidRepo ? $repo : NULL;
    }


    private function getUserPointRepoMock(): MockUserPointRepo {
        $repo = $this->getConfig()->getUserRepoFactory()->createUserPointRepo();
        return $repo instanceof MockUserPointRepo ? $repo : NULL;
    }


    protected function setUp(): void {
        $this->config = new MockSearchConfig();
    }


    public function test_no_search_items_gives_emtpy_result() {
        $query = new SearchByExtentQuery(
            [],
            Extent::createFromCoords(7.0, 47.0, 7.9, 47.9),
            11,
            1558977934,
            1559977934,
            UserHelper::createToken("asdf@asef.com", FALSE)
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
            1558977934,
            1559977934,
            UserHelper::createToken("asdf@asef.com", FALSE)
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


    public function test_search_no_token_no_userpoints() {
        $query = new SearchByExtentQuery(
            [SearchItemType::USERPOINTS],
            Extent::createFromCoords(7.0, 47.0, 7.9, 47.9),
            11,
            1558977934,
            1559977934,
            NULL
        );
        $upResults = [ DummyUserPoint1::create(), DummyUserPoint2::create() ];
        $this->getUserPointRepoMock()->pushMockResult($upResults);

        $result = SearchByExtent::search($query, $this->getConfig());
        $this->assertNotNull($result);
        $this->assertEquals(0, count($result->userPoints));
    }
}
