<?php declare(strict_types=1);

namespace NavplanTest\Geoname\UseCase;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Geoname\UseCase\SearchGeoname\SearchGeonameUc;
use NavplanTest\Geoname\Mocks\DummyGeoname1;
use NavplanTest\Geoname\Mocks\DummyGeoname2;
use NavplanTest\Geoname\Mocks\MockGeonameRepo;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\Terrain\Mocks\MockTerrainRepo;
use PHPUnit\Framework\TestCase;


class SearchGeonameTest extends TestCase {
    private array $expectedResult;
    private MockGeonameRepo $geonameRepo;
    private MockTerrainRepo $terrainRepo;
    private SearchGeonameUc $searchGeoname;


    protected function setUp(): void {
        $this->expectedResult = [ DummyGeoname1::create(), DummyGeoname2::create() ];
        $geonameConfig = new MockNavplanDiContainer();
        $this->geonameRepo = $geonameConfig->geonameRepo;
        $this->geonameRepo->pushMockResult($this->expectedResult);
        $this->terrainRepo = $geonameConfig->terrainRepo;
        $this->searchGeoname = $geonameConfig->getSearchGeonameUc();
    }


    public function test_create_instance() {
        $this->assertNotNull($this->searchGeoname);
    }


    public function test_searchByText() {
        $zeroAltReplacement = Altitude::fromMtAmsl(123);
        $this->terrainRepo->altitudeResult = $zeroAltReplacement;

        $result = $this->searchGeoname->searchByText("Bern", 10);

        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
        $this->assertEquals($zeroAltReplacement, $result[0]->elevation);
    }


    public function test_searchByPosition() {
        $pos = new Position2d(7.0, 47.0);
        $zeroAltReplacement = Altitude::fromMtAmsl(123);
        $this->terrainRepo->altitudeResult = $zeroAltReplacement;

        $result = $this->searchGeoname->searchByPosition($pos, 0.5, 10);

        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
        $this->assertEquals($zeroAltReplacement, $result[0]->elevation);
    }
}
