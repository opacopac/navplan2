<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section5;

use Navplan\MeteoGrib2\Grib2Parser\Section5\Section5Parser;
use NavplanTest\MeteoGrib2\Mocks\Section5\DummySection5_1;
use PHPUnit\Framework\TestCase;


class Section5ParserTest extends TestCase {
    public function test_parse() {
        $data = DummySection5_1::createData();
        $expected = DummySection5_1::create();

        $template = Section5Parser::parse($data);

        $this->assertEquals($expected, $template);
    }
}
