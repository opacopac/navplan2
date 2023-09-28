<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section5;

use Navplan\MeteoGrib2\Grib2Parser\Section5\DataRepresentationTemplate0Parser;
use NavplanTest\MeteoGrib2\Mocks\Section5\DummyDataRepresentationTemplate0_1;
use PHPUnit\Framework\TestCase;


class DataRepresentationTemplate0ParserTest extends TestCase {
    public function test_parse() {
        $date = DummyDataRepresentationTemplate0_1::createData();
        $expected = DummyDataRepresentationTemplate0_1::create();

        $template = DataRepresentationTemplate0Parser::parse($date);

        $this->assertEquals($expected, $template);
    }
}
