<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section4;

use Navplan\MeteoGrib2\Grib2Parser\Section4\ProductDefinitionTemplateParser;
use NavplanTest\MeteoGrib2\Mocks\Section4\DummyProductDefinitionTemplate0_1;
use PHPUnit\Framework\TestCase;


class ProductDefinitionTemplateParserTest extends TestCase {
    public function test_parse() {
        $type = 0;
        $date = DummyProductDefinitionTemplate0_1::createData();
        $expected = DummyProductDefinitionTemplate0_1::create();

        $template = ProductDefinitionTemplateParser::parse($type, $date);

        $this->assertEquals($expected, $template);
    }


    public function test_parse_missing() {
        $type = 65535;
        $date = "";

        $template = ProductDefinitionTemplateParser::parse($type, $date);

        $this->assertEquals(NULL, $template);
    }


    public function test_parse_invalid() {
        $type = 32767;
        $date = DummyProductDefinitionTemplate0_1::createData();

        $this->expectException(\InvalidArgumentException::class);
        ProductDefinitionTemplateParser::parse($type, $date);
    }
}
