<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser;

use Navplan\MeteoGrib2\Grib2Parser\ScaledValue;
use PHPUnit\Framework\TestCase;


class ScaledValueTest extends TestCase {
    public function test_unscale() {
        $scaledValue = 6350000;
        $scaleFactor = 3;

        $value = ScaledValue::unscale($scaleFactor, $scaledValue);

        $this->assertEquals(6350, $value);
    }


    public function test_unscale_zero() {
        $scaledValue = 6371200;
        $scaleFactor = 0;

        $value = ScaledValue::unscale($scaleFactor, $scaledValue);

        $this->assertEquals(6371200, $value);
    }

}
