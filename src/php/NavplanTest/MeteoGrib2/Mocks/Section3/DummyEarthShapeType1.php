<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section3;

use Navplan\MeteoGrib2\Domain\Section3\EarthShapeType;


class DummyEarthShapeType1 {
    public static function create(): EarthShapeType {
        return new EarthShapeType(EarthShapeType::SPHERICAL_RADIUS_IN_M_BY_PRODUCER);
    }


    public static function createValue(): int {
        return 1;
    }
}
