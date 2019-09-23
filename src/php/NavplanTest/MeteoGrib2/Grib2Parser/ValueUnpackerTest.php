<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser;

use Navplan\MeteoGrib2\Domain\Section5\FieldType;
use Navplan\MeteoGrib2\Grib2Parser\ValueUnpacker;
use PHPUnit\Framework\TestCase;


class ValueUnpackerTest extends TestCase {
    public function test_unpack_x1() {
        $unpacker = new ValueUnpacker(0.0, 0, 0, new FieldType(FieldType::FLOAT));
        $value = $unpacker->unpack(1);

        $this->assertEquals(1, $value);
    }


    public function test_unpack_ref1_x1() {
        $unpacker = new ValueUnpacker(1.0, 0, 0, new FieldType(FieldType::FLOAT));
        $value = $unpacker->unpack(1);

        $this->assertEquals(2, $value);
    }


    public function test_unpack_x1_bin1() {
        $unpacker = new ValueUnpacker(0.0, 1, 0, new FieldType(FieldType::FLOAT));
        $value = $unpacker->unpack(1);

        $this->assertEquals(2, $value);
    }


    public function test_unpack_x1_dec1() {
        $unpacker = new ValueUnpacker(0.0, 0, 1, new FieldType(FieldType::FLOAT));
        $value = $unpacker->unpack(1);

        $this->assertEquals(0.1, $value);
    }


    public function test_unpack_mix() {
        $unpacker = new ValueUnpacker(-10.0, 3, 4, new FieldType(FieldType::FLOAT));
        $value = $unpacker->unpack(20);

        $this->assertEquals(0.015, $value);
    }
}
