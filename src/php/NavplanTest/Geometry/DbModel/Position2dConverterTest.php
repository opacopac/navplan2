<?php declare(strict_types=1);

namespace NavplanTest\Geometry\DbModel;

use Navplan\Geometry\DbModel\Position2dConverter;
use Navplan\Geometry\DomainModel\Position2d;
use PHPUnit\Framework\TestCase;


class Position2dConverterTest extends TestCase {
    public function test_toWktCoordinatePair() {
        $pos = new Position2d(-7.123, 47.456);

        $result = Position2dConverter::toWktCoordinatePair($pos);

        $this->assertEquals("-7.123 47.456", $result);
    }


    public function test_toWktCoordinatePairList() {
        $pos1 = new Position2d(7.123, 47.456);
        $pos2 = new Position2d(8.321, -48.654);

        $result = Position2dConverter::toWktCoordinatePairList([$pos1, $pos2]);

        $this->assertEquals("7.123 47.456,8.321 -48.654", $result);
    }

    public function test_toWktPoint() {
        $pos = new Position2d(-7.123, 47.456);

        $result1 = Position2dConverter::toWktPoint($pos);
        $result2 = Position2dConverter::toWktPoint($pos, false);

        $this->assertEquals("(PointFromText('POINT(-7.123 47.456)'))", $result1);
        $this->assertEquals("POINT(-7.123 47.456)", $result2);
    }


    public function test_fromWktCoordinatePair() {
        $coordPair = "-7.123 47.456";

        $result = Position2dConverter::fromWktCoordinatePair($coordPair);

        $this->assertEquals(new Position2d(-7.123, 47.456), $result);
    }


    public function test_fromWktCoordinatePairList() {
        $coordPairList = "7.123 47.456,8.321 -48.654";

        $result = Position2dConverter::fromWktCoordinatePairList($coordPairList);

        $this->assertCount(2, $result);
        $this->assertEquals(new Position2d(7.123, 47.456), $result[0]);
        $this->assertEquals(new Position2d(8.321, -48.654), $result[1]);
    }


    public function test_fromWktPoint() {
        $wktPoint = "POINT(-7.123 47.456)";

        $result = Position2dConverter::fromWktPoint($wktPoint);

        $this->assertEquals(new Position2d(-7.123, 47.456), $result);
    }
}
