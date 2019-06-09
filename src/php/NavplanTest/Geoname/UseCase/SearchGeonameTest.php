<?php declare(strict_types=1);

namespace NavplanTest\Geoname\UseCase;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Geoname\UseCase\SearchGeoname;
use NavplanTest\Geoname\Mocks\DummyGeoname1;
use NavplanTest\Geoname\Mocks\DummyGeoname2;
use NavplanTest\Geoname\Mocks\MockGeonameRepo;
use NavplanTest\MockNavplanConfig;
use NavplanTest\Terrain\Mocks\MockTerrainRepo;
use PHPUnit\Framework\TestCase;


class SearchGeonameTest extends TestCase {
    private $expectedResult;
    /* @var $geonameRepo MockGeonameRepo */
    private $geonameRepo;
    /* @var $terrainRepo MockTerrainRepo */
    private $terrainRepo;
    /* @var $searchGeoname SearchGeoname */
    private $searchGeoname;


    protected function setUp(): void {
        $this->expectedResult = [ DummyGeoname1::create(), DummyGeoname2::create() ];
        $geonameConfig = new MockNavplanConfig();
        $this->geonameRepo = $geonameConfig->getGeonameRepo();
        $this->geonameRepo->pushMockResult($this->expectedResult);
        $this->terrainRepo = $geonameConfig->getTerrainRepo();
        $this->searchGeoname = new SearchGeoname($geonameConfig);
    }


    public function test_create_instance() {
        $this->assertNotNull($this->searchGeoname);
    }


    public function test_searchByText() {
        $zeroAltReplacement = new Altitude(123, AltitudeUnit::M, AltitudeReference::MSL);
        $this->terrainRepo->altitudeResult = $zeroAltReplacement;

        $result = $this->searchGeoname->searchByText("Bern", 10);

        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
        $this->assertEquals($zeroAltReplacement, $result[0]->elevation);
    }


    public function test_searchByPosition() {
        $pos = new Position2d(7.0, 47.0);
        $zeroAltReplacement = new Altitude(123, AltitudeUnit::M, AltitudeReference::MSL);
        $this->terrainRepo->altitudeResult = $zeroAltReplacement;

        $result = $this->searchGeoname->searchByPosition($pos, 0.5, 10);

        $this->assertEquals(count($this->expectedResult), count($result));
        $this->assertEquals($this->expectedResult[0], $result[0]);
        $this->assertEquals($this->expectedResult[1], $result[1]);
        $this->assertEquals($zeroAltReplacement, $result[0]->elevation);
    }
}
