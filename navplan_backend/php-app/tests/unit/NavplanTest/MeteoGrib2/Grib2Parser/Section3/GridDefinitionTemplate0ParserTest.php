<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Grib2Parser\Section3\GridDefinitionTemplate0Parser;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyGridDefinitionTemplate0_1;
use PHPUnit\Framework\TestCase;


class GridDefinitionTemplate0ParserTest extends TestCase {
    public function test_parse() {
        $data = DummyGridDefinitionTemplate0_1::createData();
        $expected = DummyGridDefinitionTemplate0_1::create();

        $template = GridDefinitionTemplate0Parser::parse($data);

        $this->assertEquals($expected, $template);
    }
}
