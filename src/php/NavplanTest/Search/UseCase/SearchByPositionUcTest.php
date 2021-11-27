<?php declare(strict_types=1);

namespace NavplanTest\Search\UseCase;

use Navplan\Common\DomainModel\Position2d;
use Navplan\Search\DomainModel\SearchByPositionQuery;
use Navplan\Search\DomainModel\SearchItemType;
use Navplan\Search\UseCase\SearchByPosition\SearchByPositionUc;
use Navplan\User\DomainService\TokenService;
use NavplanTest\Aerodrome\Mocks\DummyReportingPoint1;
use NavplanTest\Aerodrome\Mocks\DummyReportingSector1;
use NavplanTest\Aerodrome\Mocks\MockReportingPointRepo;
use NavplanTest\Enroute\Mocks\DummyAirspace1;
use NavplanTest\Enroute\Mocks\MockAirspaceService;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\User\Mocks\DummyUserPoint1;
use NavplanTest\User\Mocks\DummyUserPoint2;
use NavplanTest\User\Mocks\MockUserPointRepo;
use PHPUnit\Framework\TestCase;


class SearchByPositionUcTest extends TestCase {
    private MockAirspaceService $airspaceRepoMock;
    private MockReportingPointRepo $reportingPointRepoMock;
    private MockUserPointRepo $userPointRepoMock;
    private TokenService $tokenService;
    private SearchByPositionUc $searchByPositionUc;


    protected function setUp(): void {
        $config = new MockNavplanDiContainer();
        $this->airspaceRepoMock = $config->airspaceService;
        $this->reportingPointRepoMock = $config->reportingPointRepo;
        $this->userPointRepoMock = $config->userPointRepo;
        $this->tokenService = $config->getTokenService();
        $this->searchByPositionUc = $config->getSearchByPositionUc();
    }


    public function test_no_search_items_gives_emtpy_result() {
        $query = new SearchByPositionQuery(
            [],
            new Position2d(7.0, 47.0),
            0.5,
            1558977934,
            1559977934,
            $this->tokenService->createToken("asdf@asef.com", FALSE)
        );
        $result = $this->searchByPositionUc->search($query);
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


    public function test_search_only_in_reportingPoints() {
        $query = new SearchByPositionQuery(
            [SearchItemType::REPORTINGPOINTS],
            new Position2d(7.0, 47.0),
            0.5,
            1558977934,
            1559977934,
            $this->tokenService->createToken("asdf@asef.com", FALSE)
        );
        $airspaceResults = [ DummyAirspace1::create(), DummyAirspace1::create() ] ;
        $reportingPointResults = [ DummyReportingPoint1::create(), DummyReportingSector1::create() ];
        $this->airspaceRepoMock->pushMockResult($airspaceResults);
        $this->reportingPointRepoMock->pushMockResult($reportingPointResults);

        $result = $this->searchByPositionUc->search($query);
        $this->assertNotNull($result);
        $this->assertSameSize($reportingPointResults, $result->reportingPoints);
        $this->assertCount(0, $result->airspaces);
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
        $this->userPointRepoMock->pushMockResult($upResults);

        $result = $this->searchByPositionUc->search($query);
        $this->assertNotNull($result);
        $this->assertCount(0, $result->userPoints);
    }
}
