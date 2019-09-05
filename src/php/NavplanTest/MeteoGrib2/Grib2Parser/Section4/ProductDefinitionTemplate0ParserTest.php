<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section4;

use Navplan\MeteoGrib2\Grib2Parser\Section4\ProductDefinitionTemplate0Parser;
use NavplanTest\MeteoGrib2\Mocks\Section4\DummyProductDefinitionTemplate0_1;
use PHPUnit\Framework\TestCase;


class ProductDefinitionTemplate0ParserTest extends TestCase {
    public function test_parse() {
        $date = DummyProductDefinitionTemplate0_1::createData();
        $expected = DummyProductDefinitionTemplate0_1::create();

        $template = ProductDefinitionTemplate0Parser::parse($date);

        $this->assertEquals($expected, $template);
    }
}
