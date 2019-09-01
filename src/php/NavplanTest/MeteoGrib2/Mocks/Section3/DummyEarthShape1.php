<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section3;

use Navplan\MeteoGrib2\Domain\Section3\EarthShape;


class DummyEarthShape1 {
    public static function create(): EarthShape {
        return new EarthShape(
            DummyEarthShapeType1::create(),
            3,
            6350000,
            10,
            20,
            30,
            40
        );
    }


    public static function createData(): string {
        return pack("CCNCNCN",DummyEarthShapeType1::createValue(), 3, 6350000, 10, 20, 30, 40);
    }
}
