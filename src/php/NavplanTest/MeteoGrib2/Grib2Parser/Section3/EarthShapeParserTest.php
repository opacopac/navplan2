<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Grib2Parser\Section3\EarthShapeParser;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyEarthShape1;
use PHPUnit\Framework\TestCase;


class EarthShapeParserTest extends TestCase {
    public function test_parse() {
        $data = DummyEarthShape1::createData();
        $expected = DummyEarthShape1::create();

        $earthShape = EarthShapeParser::parse($data);

        $this->assertEquals($expected, $earthShape);
    }
}
