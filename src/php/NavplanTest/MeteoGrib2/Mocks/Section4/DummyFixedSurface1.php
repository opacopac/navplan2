<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section4;

use Navplan\MeteoGrib2\Domain\Section4\FixedSurface;
use Navplan\MeteoGrib2\Grib2Parser\ScaledValue;


class DummyFixedSurface1 {
    public static function create(): FixedSurface {
        return new FixedSurface(100, ScaledValue::unscale(0, 500));
    }


    public static function createData(): string {
        return pack("CCN", 100, 0, 500);
    }
}

