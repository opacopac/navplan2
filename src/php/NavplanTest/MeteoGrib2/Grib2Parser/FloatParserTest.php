<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser;

use Navplan\MeteoGrib2\Grib2Parser\FloatParser;
use PHPUnit\Framework\TestCase;


class FloatParserTest extends TestCase {
    public function test_parse_0() {
        $value = 0b0;
        $expected = 0.0;

        $float = FloatParser::parse($value);

        $this->assertEquals($expected, $float);
    }


    public function test_parse_1() {
        $value = 0b00111111100000000000000000000000;
        $expected = 1.0;

        $float = FloatParser::parse($value);

        $this->assertEquals($expected, $float);
    }


    public function test_parse_123_456() {
        $value = 0b01000010111101101110100101111001;
        $expected = 123.456;

        $float = FloatParser::parse($value);

        $this->assertLessThan(0.0001, abs($expected - $float));
    }


    public function test_parse_N987_654() {
        $value = 0b11000100011101101110100111011011;
        $expected = -987.654;

        $float = FloatParser::parse($value);

        $this->assertLessThan(0.0001, abs($expected - $float));
    }
}
