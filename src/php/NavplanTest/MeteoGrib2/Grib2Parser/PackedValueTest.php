<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser;

use Navplan\MeteoGrib2\Domain\Section5\FieldType;
use Navplan\MeteoGrib2\Grib2Parser\PackedValue;
use PHPUnit\Framework\TestCase;


class PackedValueTest extends TestCase {
    public function test_unpack_x1() {
        $value = PackedValue::unpack(
            0.0,
            1,
            0,
            0,
            new FieldType(FieldType::FLOAT)
        );

        $this->assertEquals(1, $value);
    }


    public function test_unpack_ref1_x1() {
        $value = PackedValue::unpack(
            1.0,
            1,
            0,
            0,
            new FieldType(FieldType::FLOAT)
        );

        $this->assertEquals(2, $value);
    }


    public function test_unpack_x1_bin1() {
        $value = PackedValue::unpack(
            0.0,
            1,
            1,
            0,
            new FieldType(FieldType::FLOAT)
        );

        $this->assertEquals(2, $value);
    }


    public function test_unpack_x1_dec1() {
        $value = PackedValue::unpack(
            0.0,
            1,
            0,
            1,
            new FieldType(FieldType::FLOAT)
        );

        $this->assertEquals(0.1, $value);
    }


    public function test_unpack_mix() {
        $value = PackedValue::unpack(
            -10.0,
            20,
            3,
            4,
            new FieldType(FieldType::FLOAT)
        );

        $this->assertEquals(0.015, $value);
    }
}
