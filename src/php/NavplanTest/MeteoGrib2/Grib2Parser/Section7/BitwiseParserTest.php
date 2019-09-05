<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section7;

use Navplan\MeteoGrib2\Grib2Parser\Section7\BitwiseParser;
use PHPUnit\Framework\TestCase;


class BitwiseParserTest extends TestCase {
    public function test_parse_1_bit() {
        $data = pack("n", 0b1011010011101100);
        $bp = new BitwiseParser($data);

        $value = $bp->readValue(1);

        $this->assertEquals(0b1, $value);
    }


    public function test_parse_2x6_bit() {
        $data = pack("n", 0b1011010011101100);
        $bp = new BitwiseParser($data);

        $value1 = $bp->readValue(6);
        $value2 = $bp->readValue(6);

        $this->assertEquals(0b101101, $value1);
        $this->assertEquals(0b001110, $value2);
    }


    public function test_parse_1x11_bit() {
        $data = pack("n", 0b1011010011101100);
        $bp = new BitwiseParser($data);

        $value1 = $bp->readValue(11);
        $value2 = $bp->readValue(3);

        $this->assertEquals(0b10110100111, $value1);
        $this->assertEquals(0b011, $value2);
    }


    public function test_parse_1x16_bit() {
        $data = pack("n", 0b1011010011101100);
        $bp = new BitwiseParser($data);

        $value = $bp->readValue(16);

        $this->assertEquals(0b1011010011101100, $value);
    }


    public function test_parse_null() {
        $data = pack("n", 0b1011010011101100);
        $bp = new BitwiseParser($data);

        $value = $bp->readValue(17);

        $this->assertEquals(NULL, $value);
    }
}
