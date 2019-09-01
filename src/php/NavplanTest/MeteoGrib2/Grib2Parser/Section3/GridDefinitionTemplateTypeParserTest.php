<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Grib2Parser\Section3\GridDefinitionTemplateTypeParser;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyGridDefinitionTemplateType1;
use PHPUnit\Framework\TestCase;


class GridDefinitionTemplateTypeParserTest extends TestCase {
    public function test_parse() {
        $value = DummyGridDefinitionTemplateType1::createValue();
        $expected = DummyGridDefinitionTemplateType1::create();

        $templateType = GridDefinitionTemplateTypeParser::parse($value);

        $this->assertEquals($expected, $templateType);
    }
}
