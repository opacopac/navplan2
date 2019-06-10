<?php declare(strict_types=1);

namespace NavplanTest\Search\UseCase;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Search\Domain\SearchByTextQuery;
use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\UseCase\SearchByText;
use Navplan\User\UseCase\TokenService;
use NavplanTest\Geoname\Mocks\DummyGeoname1;
use NavplanTest\Geoname\Mocks\DummyGeoname2;
use NavplanTest\Geoname\Mocks\MockGeonameRepo;
use NavplanTest\MockNavplanConfig;
use NavplanTest\Terrain\Mocks\MockTerrainRepo;
use NavplanTest\User\Mocks\DummyUserPoint1;
use NavplanTest\User\Mocks\DummyUserPoint2;
use NavplanTest\User\Mocks\MockUserPointRepo;
use PHPUnit\Framework\TestCase;


class SearchByTextTest extends TestCase {
    /* @var $config MockNavplanConfig */
    private $config;
    /* @var $userPointRepo MockUserPointRepo */
    private $userPointRepo;
    /* @var $tokenService TokenService */
    private $tokenService;
    /* @var $terrainRepo MockTerrainRepo */
    private $terrainRepo;
    /* @var $geonameRepo MockGeonameRepo */
    private $geonameRepo;


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
        $this->userPointRepo = $this->config->getUserRepoFactory()->createUserPointRepo();
        $this->tokenService = $this->config->getTokenService();
        $this->geonameRepo = $this->config->getGeonameRepo();
        $this->terrainRepo = $this->config->getTerrainRepo();
    }


    public function test_no_search_items_gives_emtpy_result() {
        $query = new SearchByTextQuery(
            [],
            "LSZB",
            $this->tokenService->createToken("asdf@asef.com", FALSE)
        );
        $result = SearchByText::search($query, $this->config);
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


    public function test_search_only_in_userPoints() {
        $query = new SearchByTextQuery(
            [SearchItemType::USERPOINTS],
            "LSZB",
            $this->tokenService->createToken("asdf@asef.com", FALSE)
        );
        $upResults = [ DummyUserPoint1::create(), DummyUserPoint2::create() ] ;
        $this->userPointRepo->pushMockResult($upResults);
        // TODO: geoname

        $result = SearchByText::search($query, $this->config);
        $this->assertNotNull($result);
        $this->assertEquals(count($upResults), count($result->userPoints));
        $this->assertEquals(0, count($result->geonames));
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
        $zeroAltReplacement = new Altitude(1234, AltitudeUnit::M, AltitudeReference::MSL);
        $this->terrainRepo->altitudeResult = $zeroAltReplacement;

        $result = SearchByText::search($query, $this->config);

        $this->assertNotNull($result);
        $this->assertEquals(count($upResults), count($result->userPoints));
        $this->assertEquals(count($gnResults), count($result->geonames));
    }


    public function test_search_no_token_no_userpoints() {
        $query = new SearchByTextQuery(
            [SearchItemType::USERPOINTS],
            "LSZB",
            NULL
        );
        $upResults = [ DummyUserPoint1::create(), DummyUserPoint2::create() ];
        $this->userPointRepo->pushMockResult($upResults);

        $result = SearchByText::search($query, $this->config);
        $this->assertNotNull($result);
        $this->assertEquals(0, count($result->userPoints));
    }
}
