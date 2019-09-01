<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section3;

use Navplan\MeteoGrib2\Domain\Section3\EarthShapeType;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyEarthShape1;
use PHPUnit\Framework\TestCase;


class EarthShapeTest extends TestCase {
    public function test_create_instance() {
        $earthShape = DummyEarthShape1::create();

        $this->assertEquals(new EarthShapeType(EarthShapeType::SPHERICAL_RADIUS_IN_M_BY_PRODUCER), $earthShape->shapeType);
        $this->assertEquals(3, $earthShape->sphericalRadiusScaleFactor);
        $this->assertEquals(6350000, $earthShape->sphericalRadiusScaleValue);
        $this->assertEquals(10, $earthShape->oblateSpheroidMajorAxisScaleFactor);
        $this->assertEquals(20, $earthShape->oblateSpheroidMajorAxisScaleValue);
        $this->assertEquals(30, $earthShape->oblateSpheroidMinorAxisScaleFactor);
        $this->assertEquals(40, $earthShape->oblateSpheroidMinorAxisScaleValue);
    }
}
