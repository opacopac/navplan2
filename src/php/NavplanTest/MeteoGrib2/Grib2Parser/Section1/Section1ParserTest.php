<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section1;

use Navplan\MeteoGrib2\Grib2Parser\Section1\Section1Parser;
use NavplanTest\MeteoGrib2\Mocks\Section1\DummySection1_1;
use PHPUnit\Framework\TestCase;


class Section1ParserTest extends TestCase {
    public function test_parse() {
        $data = DummySection1_1::createData();
        $expected = DummySection1_1::create();

        $section = Section1Parser::parse($data);

        $this->assertEquals($expected, $section);
    }
}
