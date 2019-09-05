<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section3;

use Navplan\MeteoGrib2\Grib2Parser\ScaledValue;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyEarthShape1;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyEarthShapeType1;
use PHPUnit\Framework\TestCase;


class EarthShapeTest extends TestCase {
    public function test_create_instance() {
        $earthShape = DummyEarthShape1::create();

        $this->assertEquals(DummyEarthShapeType1::create(), $earthShape->getShapeType());
        $this->assertEquals(ScaledValue::unscale(3, 6350000), $earthShape->getSphericalRadius());
        $this->assertEquals(ScaledValue::unscale(10, 20), $earthShape->getOblateSpheroidMajorAxis());
        $this->assertEquals(ScaledValue::unscale(30, 40), $earthShape->getOblateSpheroidMinorAxis());
    }
}
