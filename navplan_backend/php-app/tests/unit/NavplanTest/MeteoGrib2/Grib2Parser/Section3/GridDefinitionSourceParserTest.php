<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Grib2Parser\Section3\GridDefinitionSourceParser;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyGridDefinitionSource1;
use PHPUnit\Framework\TestCase;


class GridDefinitionSourceParserTest extends TestCase {
    public function test_parse() {
        $value = DummyGridDefinitionSource1::createValue();
        $expected = DummyGridDefinitionSource1::create();

        $gridDefSource = GridDefinitionSourceParser::parse($value);

        $this->assertEquals($expected, $gridDefSource);
    }
}
