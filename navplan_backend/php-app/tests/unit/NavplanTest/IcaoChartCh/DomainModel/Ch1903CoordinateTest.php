<?php declare(strict_types=1);

namespace NavplanTest\IcaoChartCh\DomainModel;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\IcaoChartCh\DomainModel\Ch1903Coordinate;
use PHPUnit\Framework\TestCase;


class Ch1903CoordinateTest extends TestCase {
    protected function setUp(): void {
    }


    public function test__construct() {
        $chCoord = new Ch1903Coordinate(600000, 200000);

        $this->assertNotNull($chCoord);
    }


    public function test_east_north() {
        $chCoord = new Ch1903Coordinate(600000, 200000);

        $this->assertEquals(600000, $chCoord->east);
        $this->assertEquals(200000, $chCoord->north);
    }


    public function test_toPos2d() {
        $chCoord = new Ch1903Coordinate(600000, 200000);
        $pos = $chCoord->toPos2d();

        $this->assertEqualsWithDelta(7.438632495, $pos->longitude, 0.00001);
        $this->assertEqualsWithDelta(46.951082877, $pos->latitude, 0.00001);
    }


    public function test_fromPos2d() {
        $pos = new Position2d(7.438632495, 46.951082877);
        $chCoord = Ch1903Coordinate::fromPos2d($pos);

        $this->assertEqualsWithDelta(600000, $chCoord->east, 1);
        $this->assertEqualsWithDelta(200000, $chCoord->north, 1);
    }
}
