<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Grib2Parser\Section3\GridDefinitionTemplatePolarStereographicParser;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyGridDefinitionTemplatePolarStereographic1;
use PHPUnit\Framework\TestCase;


class GridDefinitionTemplatePolarStereographicParserTest extends TestCase {
    public function test_parse() {
        $data = DummyGridDefinitionTemplatePolarStereographic1::createData();
        $expected = DummyGridDefinitionTemplatePolarStereographic1::create();

        $template = GridDefinitionTemplatePolarStereographicParser::parse($data);

        $this->assertEquals($expected, $template);
    }
}
