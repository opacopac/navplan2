<?php declare(strict_types=1);

namespace NavplanTest\Geometry\DbModel;

use Navplan\Geometry\DbModel\Line2dConverter;
use Navplan\Geometry\DomainModel\Line2d;
use Navplan\Geometry\DomainModel\Position2d;
use PHPUnit\Framework\TestCase;


class Line2dConverterTest extends TestCase {
    public function test_toWktLineString() {
        $pos1 = new Position2d(0, 0);
        $pos2 = new Position2d(0, 10);
        $pos3 = new Position2d(10, 0);
        $line2d = new Line2d([$pos1, $pos2, $pos3]);

        $result1 = Line2dConverter::toWktLineString($line2d);
        $result2 = Line2dConverter::toWktLineString($line2d, false);

        $this->assertEquals("(LineFromText('LINESTRING(0 0,0 10,10 0)'))", $result1);
        $this->assertEquals("LINESTRING(0 0,0 10,10 0)", $result2);
    }


    public function test_toWktMultilineString() {
        $pos1a = new Position2d(10, 48);
        $pos1b = new Position2d(10, 21);
        $pos1c = new Position2d(10, 0);
        $line1 = new Line2d([$pos1a, $pos1b, $pos1c]);
        $pos2a = new Position2d(16, 0);
        $pos2b = new Position2d(16, 23);
        $pos2c = new Position2d(16, 48);
        $line2 = new Line2d([$pos2a, $pos2b, $pos2c]);

        $result1 = Line2dConverter::toWktMultilineString([$line1, $line2]);
        $result2 = Line2dConverter::toWktMultilineString([$line1, $line2], false);

        $this->assertEquals("(MLineFromText('MULTILINESTRING((10 48,10 21,10 0),(16 0,16 23,16 48))'))", $result1);
        $this->assertEquals("MULTILINESTRING((10 48,10 21,10 0),(16 0,16 23,16 48))", $result2);
    }


    public function test_fromWktLineString() {
        $lineString = "LINESTRING(0 0,0 10,10 0)";

        $result = Line2dConverter::fromWktLineString($lineString);

        $this->assertCount(3, $result->position2dList);
        $this->assertEquals(new Position2d(0, 0), $result->position2dList[0]);
        $this->assertEquals(new Position2d(0, 10), $result->position2dList[1]);
        $this->assertEquals(new Position2d(10, 0), $result->position2dList[2]);
    }


    public function test_fromWktMultiLineString() {
        $multiLineString = "MULTILINESTRING((10 48,10 21,10 0),(16 0,16 23,16 48))";

        $result = Line2dConverter::fromWktMultiLineString($multiLineString);

        $this->assertCount(2, $result);
        $this->assertEquals(
            new Line2d([new Position2d(10, 48), new Position2d(10, 21), new Position2d(10, 0)]),
            $result[0]
        );
        $this->assertEquals(
            new Line2d([new Position2d(16, 0), new Position2d(16, 23), new Position2d(16, 48)]),
            $result[1]
        );
    }
}
