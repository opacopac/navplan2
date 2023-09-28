<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section4;

use DateInterval;
use Navplan\MeteoGrib2\Grib2Parser\Section4\TimeRangeParser;
use PHPUnit\Framework\TestCase;


class TimeRangeParserTest extends TestCase {
    public function test_parse_12h() {
        $unit = 1;
        $value = 12;
        $expected = new DateInterval("PT12H");

        $intervall = TimeRangeParser::parse($unit, $value);

        $this->assertEquals($expected, $intervall);
    }


    public function test_parse_3h() {
        $unit = 10;
        $value = 1;
        $expected = new DateInterval("PT3H");

        $intervall = TimeRangeParser::parse($unit, $value);

        $this->assertEquals($expected, $intervall);
    }


    public function test_parse_200y() {
        $unit = 7;
        $value = 2;
        $expected = new DateInterval("P200Y");

        $intervall = TimeRangeParser::parse($unit, $value);

        $this->assertEquals($expected, $intervall);
    }


    public function test_parse_missing() {
        $unit = 255;
        $value = 0;
        $expected = NULL;

        $intervall = TimeRangeParser::parse($unit, $value);

        $this->assertEquals($expected, $intervall);
    }


    public function test_parse_invalid() {
        $unit = 191;
        $value = 0;
        $expected = NULL;

        $this->expectException(\InvalidArgumentException::class);
        TimeRangeParser::parse($unit, $value);
    }
}
