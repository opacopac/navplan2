<?php declare(strict_types=1);

namespace NavplanTest\Terrain\UseCase;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Terrain\UseCase\ReadElevation;
use NavplanTest\Terrain\Mocks\MockTerrainRepo;
use PHPUnit\Framework\TestCase;


class ReadElevationTest extends TestCase {
    /* @var $repoMock MockTerrainRepo */
    private $repoMock;

    /* @var $getElevation ReadElevation */
    private $getElevation;


    protected function setUp(): void {
        $this->repoMock = new MockTerrainRepo();
        $this->getElevation = new ReadElevation($this->repoMock);
    }


    public function test_create_instance() {
        $this->assertNotNull($this->getElevation);
    }


    public function test_get() {
        $pos = new Position2d(7.0, 47.0);
        $alt = new Altitude(500, AltitudeUnit::M, AltitudeReference::MSL);
        $this->repoMock->altitudeResult = $alt;

        $elevation = $this->getElevation->read($pos);

        $this->assertNotNull($elevation);
        $this->assertEquals($elevation->longitude, $pos->longitude);
        $this->assertEquals($elevation->latitude, $pos->latitude);
        $this->assertEquals($elevation->altitude, $alt);
    }
}
