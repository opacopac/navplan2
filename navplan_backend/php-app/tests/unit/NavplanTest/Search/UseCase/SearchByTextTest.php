<?php declare(strict_types=1);

namespace NavplanTest\Search\UseCase;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Search\Domain\Model\SearchByTextQuery;
use Navplan\Search\Domain\Model\SearchItemType;
use Navplan\Search\UseCase\SearchByText\SearchByTextUc;
use Navplan\User\Domain\Service\TokenService;
use NavplanTest\Geoname\Mocks\DummyGeoname1;
use NavplanTest\Geoname\Mocks\DummyGeoname2;
use NavplanTest\Geoname\Mocks\MockGeonameRepo;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\Terrain\Mocks\MockTerrainRepo;
use NavplanTest\User\Mocks\DummyUserPoint1;
use NavplanTest\User\Mocks\DummyUserPoint2;
use NavplanTest\User\Mocks\MockUserPointRepo;
use PHPUnit\Framework\TestCase;


class SearchByTextTest extends TestCase {
    private MockUserPointRepo $userPointRepo;
    private TokenService $tokenService;
    private MockTerrainRepo $terrainRepo;
    private MockGeonameRepo $geonameRepo;
    private SearchByTextUc $searchByTextUc;


    protected function setUp(): void {
        $config = new MockNavplanDiContainer();
        $this->userPointRepo = $config->userPointRepo;
        $this->tokenService = $config->getTokenService();
        $this->geonameRepo = $config->geonameRepo;
        $this->terrainRepo = $config->terrainRepo;
        $this->searchByTextUc = $config->getSearchByTextUc();
    }


    public function test_no_search_items_gives_emtpy_result() {
        $query = new SearchByTextQuery(
            [],
            "LSZB",
            $this->tokenService->createToken("asdf@asef.com", FALSE)
        );
        $result = $this->searchByTextUc->search($query);

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


    public function test_search_only_in_userPoints() {
        $query = new SearchByTextQuery(
            [SearchItemType::USERPOINTS],
            "LSZB",
            $this->tokenService->createToken("asdf@asef.com", FALSE)
        );
        $upResults = [ DummyUserPoint1::create(), DummyUserPoint2::create() ] ;
        $this->userPointRepo->pushMockResult($upResults);
        // TODO: geoname

        $result = $this->searchByTextUc->search($query);

        $this->assertNotNull($result);
        $this->assertSameSize($upResults, $result->userPoints);
        $this->assertCount(0, $result->geonames);
    }


    public function test_search_in_userpoints_and_geonames() {
        $query = new SearchByTextQuery(
            [SearchItemType::USERPOINTS, SearchItemType::GEONAMES],
            "LSZB",
            $this->tokenService->createToken("asdf@asef.com", FALSE)
        );
        $upResults = [DummyUserPoint1::create(), DummyUserPoint2::create()] ;
        $this->userPointRepo->pushMockResult($upResults);
        $gnResults = [DummyGeoname1::create(), DummyGeoname2::create()];
        $this->geonameRepo->pushMockResult($gnResults);
        $zeroAltReplacement = Altitude::fromMtAmsl(1234);
        $this->terrainRepo->altitudeResult = $zeroAltReplacement;

        $result = $this->searchByTextUc->search($query);

        $this->assertNotNull($result);
        $this->assertSameSize($upResults, $result->userPoints);
        $this->assertSameSize($gnResults, $result->geonames);
    }


    public function test_search_no_token_no_userpoints() {
        $query = new SearchByTextQuery(
            [SearchItemType::USERPOINTS],
            "LSZB",
            NULL
        );
        $upResults = [ DummyUserPoint1::create(), DummyUserPoint2::create() ];
        $this->userPointRepo->pushMockResult($upResults);

        $result = $this->searchByTextUc->search($query);

        $this->assertNotNull($result);
        $this->assertCount(0, $result->userPoints);
    }
}
