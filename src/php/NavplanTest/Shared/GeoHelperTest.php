<?php declare(strict_types=1);

namespace NavplanTest\Shared;

use Navplan\Geometry\DomainModel\LengthUnit;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Shared\GeoHelper;
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
}
