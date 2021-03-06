<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section3;

use Navplan\MeteoGrib2\Domain\Section3\EarthShape;
use Navplan\MeteoGrib2\Grib2Parser\ScaledValue;


class DummyEarthShape1 {
    public static function create(): EarthShape {
        return new EarthShape(
            DummyEarthShapeType1::create(),
            ScaledValue::unscale(3, 6350000),
            ScaledValue::unscale(10, 20),
            ScaledValue::unscale(30, 40)
        );
    }


    public static function createData(): string {
        return pack("CCNCNCN",
            DummyEarthShapeType1::createValue(),
            3, 6350000,
            10, 20,
            30, 40
        );
    }
}
