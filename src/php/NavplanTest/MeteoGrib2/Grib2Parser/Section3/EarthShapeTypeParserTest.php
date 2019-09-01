<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Grib2Parser\Section3\EarthShapeTypeParser;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyEarthShapeType1;
use PHPUnit\Framework\TestCase;


class EarthShapeTypeParserTest extends TestCase {
    public function test_parse() {
        $value = DummyEarthShapeType1::createValue();
        $expected = DummyEarthShapeType1::create();

        $earthShapeType = EarthShapeTypeParser::parse($value);

        $this->assertEquals($expected, $earthShapeType);
    }
}
