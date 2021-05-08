<?php declare(strict_types=1);

namespace NavplanTest\Search\UseCase;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Search\DomainModel\SearchByExtentQuery;
use Navplan\Search\DomainModel\SearchItemType;
use Navplan\Search\UseCase\SearchByExtent\SearchByExtentUc;
use Navplan\User\DomainService\TokenService;
use NavplanTest\Airport\Mocks\DummyAirport1;
use NavplanTest\Airport\Mocks\MockAirportRepo;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use NavplanTest\OpenAip\Mocks\MockNavaidRepo;
use NavplanTest\User\Mocks\DummyUserPoint1;
use NavplanTest\User\Mocks\DummyUserPoint2;
use NavplanTest\User\Mocks\MockUserPointRepo;
use PHPUnit\Framework\TestCase;


class SearchByExtentUcTest extends TestCase {
    private MockAirportRepo $airportRepo;
    private MockNavaidRepo $navaidRepo;
    private MockUserPointRepo $upRepo;
    private TokenService $tokenService;
    private SearchByExtentUc $searchByExtentUc;


    protected function setUp(): void {
        $config = new MockNavplanDiContainer();
        $this->airportRepo = $config->airportRepo;
        $this->navaidRepo = $config->navaidRepo;
        $this->upRepo = $config->userPointRepo;
        $this->tokenService = $config->getTokenService();
        $this->searchByExtentUc = $config->getSearchByExtentUc();
    }


    public function test_no_search_items_gives_emtpy_result() {
        $query = new SearchByExtentQuery(
            [],
            Extent::createFromCoords(7.0, 47.0, 7.9, 47.9),
            11,
            1558977934,
            1559977934,
            $this->tokenService->createToken("asdf@asef.com", FALSE)
        );
        $result = $this->searchByExtentUc->search($query);
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


    public function test_search_only_in_airports() {
        $query = new SearchByExtentQuery(
            [SearchItemType::AIRPORTS],
            Extent::createFromCoords(7.0, 47.0, 7.9, 47.9),
            11,
            1558977934,
            1559977934,
            $this->tokenService->createToken("asdf@asef.com", FALSE)
        );
        $airportResults = [ DummyAirport1::create(), DummyAirport1::create() ] ;
        $navaidResults = [ DummyNavaid1::create(), DummyNavaid1::create() ];
        $this->airportRepo->pushMockResult($airportResults);
        $this->navaidRepo->pushMockResult($navaidResults);

        $result = $this->searchByExtentUc->search($query);
        $this->assertNotNull($result);
        $this->assertSameSize($airportResults, $result->airports);
        $this->assertCount(0, $result->navaids);
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
        $this->upRepo->pushMockResult($upResults);

        $result = $this->searchByExtentUc->search($query);
        $this->assertNotNull($result);
        $this->assertCount(0, $result->userPoints);
    }
}
