<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section5;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Grib2Parser\Section5\DataRepresentationTemplateParser;
use NavplanTest\MeteoGrib2\Mocks\Section5\DummyDataRepresentationTemplate0_1;
use PHPUnit\Framework\TestCase;


class DataRepresentationTemplateParserTest extends TestCase {
    public function test_parse() {
        $type = 0;
        $data = DummyDataRepresentationTemplate0_1::createData();
        $expected = DummyDataRepresentationTemplate0_1::create();

        $template = DataRepresentationTemplateParser::parse($type, $data);

        $this->assertEquals($expected, $template);
    }


    public function test_parse_missing() {
        $type = 65535;
        $date = "";

        $template = DataRepresentationTemplateParser::parse($type, $date);

        $this->assertEquals(NULL, $template);
    }


    public function test_parse_invalid() {
        $type = 49151;
        $date = DummyDataRepresentationTemplate0_1::createData();

        $this->expectException(InvalidArgumentException::class);

        DataRepresentationTemplateParser::parse($type, $date);
    }
}
