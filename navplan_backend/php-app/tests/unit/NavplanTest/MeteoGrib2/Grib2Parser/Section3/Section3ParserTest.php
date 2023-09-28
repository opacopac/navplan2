<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Grib2Parser\Section3\Section3Parser;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummySection3_1;
use PHPUnit\Framework\TestCase;


class Section3ParserTest extends TestCase {
    public function test_parse() {
        $data = DummySection3_1::createData();
        $expected = DummySection3_1::create();

        $section = Section3Parser::parse($data);

        $this->assertEquals($expected, $section);
    }
}
