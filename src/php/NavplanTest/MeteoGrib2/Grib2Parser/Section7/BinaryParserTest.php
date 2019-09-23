<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section7;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Grib2Parser\Section7\BinaryParser;
use PHPUnit\Framework\TestCase;


class BinaryParserTest extends TestCase {
    // region even bit count
    
    public function test_parse_8_bits() {
        $data = pack("C", 0b11111111);

        $values = BinaryParser::parse(8, $data);

        $this->assertEquals(1, count($values));
        $this->assertEquals(0b11111111, $values[0]);
    }


    public function test_parse_16_bits() {
        $data = pack("n", 0b1111111111111111);

        $values = BinaryParser::parse(16, $data);

        $this->assertEquals(1, count($values));
        $this->assertEquals(0b1111111111111111, $values[0]);
    }


    public function test_parse_32_bits() {
        $data = pack("N",  0b11111111111111111111111111111111);

        $values = BinaryParser::parse(32, $data);

        $this->assertEquals(1, count($values));
        $this->assertEquals(0b11111111111111111111111111111111, $values[0]);
    }


    public function test_parse_2x32_bits() {
        $data = pack("nnnn", 0b1111111111111111, 0b1111111111111111, 0b1111111111111111, 0b1111111111111111);

        $values = BinaryParser::parse(32, $data);

        $this->assertEquals(2, count($values));
        $this->assertEquals(0b11111111111111111111111111111111, $values[0]);
        $this->assertEquals(0b11111111111111111111111111111111, $values[1]);
    }


    public function test_parse_2x8_bits() {
        $data = pack("CC", 99, 88);

        $values = BinaryParser::parse(8, $data);

        $this->assertEquals(2, count($values));
        $this->assertEquals(99, $values[0]);
        $this->assertEquals(88, $values[1]);
    }


    public function test_parse_input_too_short() {
        $data = pack("C", 99);

        $values = BinaryParser::parse(32, $data);
        $this->assertEquals(0, count($values));
    }


    public function test_parse_input_empty() {
        $data = "";

        $values = BinaryParser::parse(8, $data);

        $this->assertEquals(0, count($values));
    }


    public function test_parse_not_supported_bitcount_M1() {
        $data = "";

        $this->expectException(InvalidArgumentException::class);

        BinaryParser::parse(-1, $data);
    }

    // endregion


    // region odd bitcount

    public function test_parse_8x1_bit() {
        $data = pack("C", 0b10110100);

        $values = BinaryParser::parse(1, $data);

        $this->assertEquals(8, count($values));
        $this->assertEquals(0b1, $values[0]);
        $this->assertEquals(0b0, $values[1]);
        $this->assertEquals(0b1, $values[2]);
        $this->assertEquals(0b1, $values[3]);
        $this->assertEquals(0b0, $values[4]);
        $this->assertEquals(0b1, $values[5]);
        $this->assertEquals(0b0, $values[6]);
        $this->assertEquals(0b0, $values[7]);
    }


    public function test_parse_2x6_bit() {
        $data = pack("n", 0b1011010011101100);

        $values = BinaryParser::parse(6, $data);

        $this->assertEquals(2, count($values));
        $this->assertEquals(0b101101, $values[0]);
        $this->assertEquals(0b001110, $values[1]);
    }


    public function test_parse_1x11bit() {
        $data = pack("n", 0b1011010011101100);

        $values = BinaryParser::parse(11, $data);

        $this->assertEquals(1, count($values));
        $this->assertEquals(0b10110100111, $values[0]);
    }


    public function test_parse_1x16_bit() {
        $data = pack("n", 0b1011010011101100);

        $values = BinaryParser::parse(16, $data);

        $this->assertEquals(1, count($values));
        $this->assertEquals(0b1011010011101100, $values[0]);
    }


    public function test_parse_1x24_bit() {
        $data = pack("nC", 0b1011010011101100, 0b11001111);

        $values = BinaryParser::parse(24, $data);

        $this->assertEquals(1, count($values));
        $this->assertEquals(0b101101001110110011001111, $values[0]);
    }


    public function test_parse_2x24_bit() {
        $data = pack("Nn", 0b10110100111011001100111111111100, 0b1010110011001011);

        $values = BinaryParser::parse(24, $data);

        $this->assertEquals(2, count($values));
        $this->assertEquals(0b101101001110110011001111, $values[0]);
        $this->assertEquals(0b111111001010110011001011, $values[1]);
    }


    public function test_parse_1x30_bit() {
        $data = pack("N", 0b10110100111011001010110100000100);

        $values = BinaryParser::parse(30, $data);

        $this->assertEquals(1, count($values));
        $this->assertEquals(0b101101001110110010101101000001, $values[0]);
    }


    public function test_parse_2x30_bit() {
        $data = pack("NN", 0b10110100111011001010110100000110, 0b11010011101100111011110000010000);

        $values = BinaryParser::parse(30, $data);

        $this->assertEquals(2, count($values));
        $this->assertEquals(0b101101001110110010101101000001, $values[0]);
        $this->assertEquals(0b101101001110110011101111000001, $values[1]);
    }


    public function test_parse_1x60_bit() {
        $data = pack("NN", 0b10110100111011001010110100000110, 0b11010011101100111011110000010000);

        $values = BinaryParser::parse(60, $data);

        $this->assertEquals(1, count($values));
        $this->assertEquals(0b101101001110110010101101000001101101001110110011101111000001, $values[0]);
    }


    public function test_parse_2x60_bit() {
        $data = pack("NNNnC", 0b10110100111011001010110100000110, 0b11010011101100111011110000010011, 0b01001110110010101100000001101101, 0b0011101100110011, 0b11000001);

        $values = BinaryParser::parse(60, $data);

        $this->assertEquals(2, count($values));
        $this->assertEquals(0b101101001110110010101101000001101101001110110011101111000001, $values[0]);
        $this->assertEquals(0b001101001110110010101100000001101101001110110011001111000001, $values[1]);
    }


    public function test_parse_1x63_bit_max_bits() {
        $data = pack("NN", 0b11111111111111111111111111111111, 0b11111111111111111111111111111110);

        $values = BinaryParser::parse(63, $data);

        $this->assertEquals(1, count($values));
        $this->assertEquals(0b111111111111111111111111111111111111111111111111111111111111111, $values[0]);
    }


    public function test_parse_1x64_bit_over_max_bits() {
        $data = pack("J", 0b0111111111111111111111111111111111111111111111111111111111111111);

        $this->expectException(InvalidArgumentException::class);

        BinaryParser::parse(64, $data);
    }


    public function test_parse_0_bits() {
        $data = pack("n", 0b1011010011101100);

        $this->expectException(InvalidArgumentException::class);

        BinaryParser::parse(0, $data);
    }


    public function test_parse_N1_bits() {
        $data = pack("n", 0b1011010011101100);

        $this->expectException(InvalidArgumentException::class);

        BinaryParser::parse(-1, $data);
    }


    public function test_parse_not_enough_bits() {
        $data = pack("n", 0b1011010011101100);

        $values = BinaryParser::parse(17, $data);

        $this->assertEquals(0, count($values));
    }


    public function test_parse_empty() {
        $data = "";

        $values = BinaryParser::parse(1, $data);

        $this->assertEquals(0, count($values));
    }

    // endregion
}
