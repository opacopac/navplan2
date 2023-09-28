<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section4;

use Navplan\MeteoGrib2\Grib2Parser\Section4\FixedSurfaceParser;
use NavplanTest\MeteoGrib2\Mocks\Section4\DummyFixedSurface1;
use PHPUnit\Framework\TestCase;


class FixedSurfaceParserTest extends TestCase {
    public function test_parse() {
        $type = 100;
        $scaleFactor = 0;
        $scaledValue = 500;
        $expected = DummyFixedSurface1::create();

        $fixedSurface = FixedSurfaceParser::parse($type, $scaleFactor, $scaledValue);

        $this->assertEquals($expected, $fixedSurface);
    }


    public function test_parse_missing() {
        $type = 255;
        $scaleFactor = 0;
        $scaledValue = 0;

        $fixedSurface = FixedSurfaceParser::parse($type, $scaleFactor, $scaledValue);

        $this->assertEquals(NULL, $fixedSurface);
    }
}
