<?php declare(strict_types=1);

namespace NavplanTest\Common;

use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\DomainModel\LineInterval2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\GeoHelper;
use PHPUnit\Framework\TestCase;


class GeoHelperTest extends TestCase {

    // region calcHaversineDistance

    public function test_calcHaversineDistance() {
        $pos1 = new Position2d(7.0, 47.0);
        $pos2 = new Position2d(7.9, 47.9);

        $dist = GeoHelper::calcHaversineDistance($pos1, $pos2);

        $this->assertNotNull($dist);
        $this->assertEquals(round(120807.40449470632), round($dist->getValue(LengthUnit::M)));
    }


    public function test_calcHaversineDistance_2() {
        $pos1 = new Position2d(-25.3, 121.9);
        $pos2 = new Position2d(33.123, -15.3);

        $dist = GeoHelper::calcHaversineDistance($pos1, $pos2);

        $this->assertNotNull($dist);
        $this->assertEquals(round(13276843.125378535), round($dist->getValue(LengthUnit::M)));
    }

    public function test_calcHaversineDistance_zero() {
        $pos1 = new Position2d(7.9, 47.9);
        $pos2 = new Position2d(7.9, 47.9);

        $dist = GeoHelper::calcHaversineDistance($pos1, $pos2);

        $this->assertNotNull($dist);
        $this->assertEquals(0, $dist->getValue(LengthUnit::M));
    }

    // endregion


    // region calcHaversineDistance

    public function test_calcLineIntersection() {
        $line1 = new LineInterval2d(
            new Position2d(7.0, 47.0),
            new Position2d(8.0, 48.0)
        );
        $line2 = new LineInterval2d(
            new Position2d(7.0, 48.0),
            new Position2d(8.0, 47.0)
        );
        $expected = new Position2d(7.5, 47.5);

        $actual = GeoHelper::calcLineIntersection($line1, $line2);

        $this->assertNotNull($actual);
        $this->assertEquals($expected, $actual);
    }


    public function test_calcLineIntersection_parallel() {
        $line1 = new LineInterval2d(
            new Position2d(7.0, 47.0),
            new Position2d(8.0, 48.0)
        );
        $line2 = new LineInterval2d(
            new Position2d(7.1, 47.1),
            new Position2d(8.1, 48.1)
        );

        $actual = GeoHelper::calcLineIntersection($line1, $line2);

        $this->assertNull($actual);
    }


    public function test_calcLineIntersection_identical() {
        $line1 = new LineInterval2d(
            new Position2d(7.0, 47.0),
            new Position2d(8.0, 48.0)
        );
        $line2 = new LineInterval2d(
            new Position2d(7.0, 47.0),
            new Position2d(8.0, 48.0)
        );

        $actual = GeoHelper::calcLineIntersection($line1, $line2);

        $this->assertNull($actual);
    }


    public function test_calcLineIntersection_not_crossing() {
        $line1 = new LineInterval2d(
            new Position2d(7.0, 47.0),
            new Position2d(8.0, 48.0)
        );
        $line2 = new LineInterval2d(
            new Position2d(6.0, 47.0),
            new Position2d(6.0, 48.0)
        );

        $actual = GeoHelper::calcLineIntersection($line1, $line2);

        $this->assertNull($actual);
    }


    public function test_calcLineIntersection_not_crossing2() {
        $line1 = new LineInterval2d(
            new Position2d(7.0, 47.0),
            new Position2d(8.0, 48.0)
        );
        $line2 = new LineInterval2d(
            new Position2d(7.0, 48.0),
            new Position2d(7.2, 47.8)
        );

        $actual = GeoHelper::calcLineIntersection($line1, $line2);

        $this->assertNull($actual);
    }


    public function test_calcLineIntersection_not_crossing3() {
        $line2 = new LineInterval2d(
            new Position2d(7.0, 47.0),
            new Position2d(8.0, 48.0)
        );
        $line1 = new LineInterval2d(
            new Position2d(7.0, 48.0),
            new Position2d(7.2, 47.8)
        );

        $actual = GeoHelper::calcLineIntersection($line1, $line2);

        $this->assertNull($actual);
    }

    // endregion
}
