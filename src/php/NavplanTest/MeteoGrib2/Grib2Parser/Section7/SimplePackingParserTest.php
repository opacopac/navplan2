<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section7;

use Navplan\MeteoGrib2\Domain\Section5\DataRepresentationTemplate0;
use Navplan\MeteoGrib2\Domain\Section5\FieldType;
use Navplan\MeteoGrib2\Grib2Parser\Section7\SimplePackingParser;
use PHPUnit\Framework\TestCase;


class SimplePackingParserTest extends TestCase {
    public function test_parse_1x11_bits() {
        $template = new DataRepresentationTemplate0(
            53400.0,
            0,
            1,
            11,
            new FieldType(FieldType::FLOAT)
        );
        $data = pack("n", 0b1011010011100000);
        $expected = [(53400 + 0b10110100111) / 10];

        $values = SimplePackingParser::parse($template, $data, 1, NULL);

        $this->assertEquals($expected, $values);
    }


    public function test_parse_8x1_bit() {
        $template = new DataRepresentationTemplate0(
            0.0,
            0,
            0,
            1,
            new FieldType(FieldType::FLOAT)
        );
        $data = pack("C", 0b10110100);
        $expected = [1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0];

        $values = SimplePackingParser::parse($template, $data, 8, NULL);

        $this->assertEquals($expected, $values);
    }


    public function test_parse_3x1_byte() {
        $template = new DataRepresentationTemplate0(
            0.0,
            0,
            0,
            8,
            new FieldType(FieldType::FLOAT)
        );
        $data = pack("CCC", 1, 2, 3);
        $expected = [1.0, 2.0, 3.0];

        $values = SimplePackingParser::parse($template, $data, 3, NULL);

        $this->assertEquals($expected, $values);
    }


    public function test_parse_3x5_bit() {
        $template = new DataRepresentationTemplate0(
            0.0,
            0,
            0,
            5,
            new FieldType(FieldType::FLOAT)
        );
        $data = pack("n", 0b1011010011100000);
        $expected = [22.0, 19.0, 16.0];

        $values = SimplePackingParser::parse($template, $data, 3, NULL);

        $this->assertEquals($expected, $values);
    }


    public function test_parse_empty_data() {
        $template = new DataRepresentationTemplate0(
            0.0,
            0,
            0,
            8,
            new FieldType(FieldType::FLOAT)
        );
        $data = "";
        $expected = [];

        $values = SimplePackingParser::parse($template, $data, 0, NULL);

        $this->assertEquals($expected, $values);
    }
}
