<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Grib2Parser\Section3\GridDefinitionTemplate20Parser;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyGridDefinitionTemplate20_1;
use PHPUnit\Framework\TestCase;


class GridDefinitionTemplate20ParserTest extends TestCase {
    public function test_parse() {
        $data = DummyGridDefinitionTemplate20_1::createData();
        $expected = DummyGridDefinitionTemplate20_1::create();

        $template = GridDefinitionTemplate20Parser::parse($data);

        $this->assertEquals($expected, $template);
    }
}
