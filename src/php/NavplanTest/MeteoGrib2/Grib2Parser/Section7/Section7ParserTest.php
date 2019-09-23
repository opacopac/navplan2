<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section7;

use Navplan\MeteoGrib2\Grib2Parser\Section7\Section7Parser;
use NavplanTest\MeteoGrib2\Mocks\Section5\DummyDataRepresentationTemplate0_1;
use NavplanTest\MeteoGrib2\Mocks\Section7\DummySection7_1;
use PHPUnit\Framework\TestCase;


class Section7ParserTest extends TestCase {
    public function test_parse() {
        $data = DummySection7_1::createData();
        $expected = DummySection7_1::create();
        $template = DummyDataRepresentationTemplate0_1::create();

        $template = Section7Parser::parse($data, $template);

        $this->assertEquals($expected, $template);
    }
}
