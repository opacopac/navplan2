<?php declare(strict_types=1);

namespace NavplanTest\IcaoChartCh\DomainModel;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\IcaoChartCh\DomainModel\MapTileCoordinate;
use PHPUnit\Framework\TestCase;


class MapTileCoordinateTest extends TestCase {
    protected function setUp(): void {
    }


    public function test__construct() {
        $mapTileCoord = new MapTileCoordinate(1, 1, 1);

        $this->assertNotNull($mapTileCoord);
    }


    public function test_x_y_z() {
        $mapTileCoord = new MapTileCoordinate(1, 2, 3);

        $this->assertEquals(1, $mapTileCoord->xtile);
        $this->assertEquals(2, $mapTileCoord->ytile);
        $this->assertEquals(3, $mapTileCoord->zoom);
    }


    public function test_toPosition_z1() {
        $mapTileCoord = new MapTileCoordinate(1, 1, 1);
        $pos = $mapTileCoord->toPosition();

        $this->assertEquals(0, $pos->latitude);
        $this->assertEquals(0, $pos->longitude);
    }


    // 17/68266/46146 <-> 46.9165 7.4982
    public function test_toPosition_z17() {
        $mapTileCoord = new MapTileCoordinate(68266, 46146, 17);
        $pos = $mapTileCoord->toPosition();

        $this->assertEqualsWithDelta(46.9165, $pos->latitude, 0.001);
        $this->assertEqualsWithDelta(7.4982, $pos->longitude, 0.001);
    }


    public function test_fromPosition_z1() {
        $pos = new Position2d(0, 0);
        $mapTileCoord = MapTileCoordinate::fromPosition($pos, 1);

        $this->assertEquals(1, $mapTileCoord->xtile);
        $this->assertEquals(1, $mapTileCoord->ytile);


        $pos2 = new Position2d(-1, 1);
        $mapTileCoord2 = MapTileCoordinate::fromPosition($pos2, 1);

        $this->assertEquals(0, $mapTileCoord2->xtile);
        $this->assertEquals(0, $mapTileCoord2->ytile);


        $pos3 = new Position2d(1, 1);
        $mapTileCoord3 = MapTileCoordinate::fromPosition($pos3, 1);

        $this->assertEquals(1, $mapTileCoord3->xtile);
        $this->assertEquals(0, $mapTileCoord3->ytile);


        $pos4 = new Position2d(1, -1);
        $mapTileCoord4 = MapTileCoordinate::fromPosition($pos4, 1);

        $this->assertEquals(1, $mapTileCoord4->xtile);
        $this->assertEquals(1, $mapTileCoord4->ytile);

        $pos4 = new Position2d(1, 1);
        $mapTileCoord4 = MapTileCoordinate::fromPosition($pos4, 1);

        $this->assertEquals(1, $mapTileCoord4->xtile);
        $this->assertEquals(0, $mapTileCoord4->ytile);
    }


    // 17/68266/46146 <-> 46.9165 7.4982
    public function test_fromPosition_z17() {
        $pos = new Position2d(7.4982, 46.9165);
        $mapTileCoord = MapTileCoordinate::fromPosition($pos, 17);

        $this->assertEqualsWithDelta(68266, $mapTileCoord->xtile, 1);
        $this->assertEqualsWithDelta(46146, $mapTileCoord->ytile, 1);
    }
}
