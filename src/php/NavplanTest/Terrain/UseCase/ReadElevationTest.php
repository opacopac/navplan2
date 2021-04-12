<?php declare(strict_types=1);

namespace NavplanTest\Terrain\UseCase;

use Navplan\Geometry\DomainModel\Altitude;
use Navplan\Geometry\DomainModel\AltitudeReference;
use Navplan\Geometry\DomainModel\AltitudeUnit;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Terrain\UseCase\ReadElevation\ReadElevationUc;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\Terrain\Mocks\MockTerrainRepo;
use PHPUnit\Framework\TestCase;


class ReadElevationTest extends TestCase {
    private MockTerrainRepo $repoMock;
    private ReadElevationUc $readElevationUc;


    protected function setUp(): void {
        $config = new MockNavplanDiContainer();
        $this->repoMock = $config->terrainRepo;
        $this->readElevationUc = $config->getReadElevationUc();
    }


    public function test_create_instance() {
        $this->assertNotNull($this->readElevationUc);
    }


    public function test_get() {
        $pos = new Position2d(7.0, 47.0);
        $alt = new Altitude(500, AltitudeUnit::M, AltitudeReference::MSL);
        $this->repoMock->altitudeResult = $alt;

        $elevation = $this->readElevationUc->read($pos);

        $this->assertNotNull($elevation);
        $this->assertEquals($elevation->longitude, $pos->longitude);
        $this->assertEquals($elevation->latitude, $pos->latitude);
        $this->assertEquals($elevation->altitude, $alt);
    }
}
