<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section4;

use Navplan\MeteoGrib2\Grib2Parser\Section4\Section4Parser;
use NavplanTest\MeteoGrib2\Mocks\Section4\DummySection4_1;
use PHPUnit\Framework\TestCase;


class Section4ParserTest extends TestCase {
    public function test_parse() {
        $data = DummySection4_1::createData();
        $expected = DummySection4_1::create();

        $template = Section4Parser::parse($data);

        $this->assertEquals($expected, $template);
    }
}
