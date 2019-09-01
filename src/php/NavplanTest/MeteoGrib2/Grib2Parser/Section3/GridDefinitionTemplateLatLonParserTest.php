<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Grib2Parser\Section3\GridDefinitionTemplateLatLonParser;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyGridDefinitionTemplateLatLon1;
use PHPUnit\Framework\TestCase;


class GridDefinitionTemplateLatLonParserTest extends TestCase {
    public function test_parse() {
        $data = DummyGridDefinitionTemplateLatLon1::createData();
        $expected = DummyGridDefinitionTemplateLatLon1::create();

        $template = GridDefinitionTemplateLatLonParser::parse($data);

        $this->assertEquals($expected, $template);
    }
}
