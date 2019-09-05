<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section5;

use Navplan\MeteoGrib2\Domain\Section5\FieldType;
use Navplan\MeteoGrib2\Grib2Parser\Section5\FieldTypeParser;
use NavplanTest\MeteoGrib2\Mocks\Section5\DummyFieldType1;
use PHPUnit\Framework\TestCase;


class FieldTypeParserTest extends TestCase {
    public function test_parse_float() {
        $value = DummyFieldType1::createValue();
        $expected = DummyFieldType1::create();

        $discipline = FieldTypeParser::parse($value);

        $this->assertEquals($expected, $discipline);
    }


    public function test_parse_int() {
        $value = 1;
        $expected = new FieldType(FieldType::INTEGER);

        $discipline = FieldTypeParser::parse($value);

        $this->assertEquals($expected, $discipline);
    }


    public function test_parse_missing() {
        $value = 255;
        $expected = new FieldType(FieldType::MISSING);

        $discipline = FieldTypeParser::parse($value);

        $this->assertEquals($expected, $discipline);
    }


    public function test_parse_unknown() {
        $value = 191;
        $expected = new FieldType(FieldType::UNKNOWN);

        $discipline = FieldTypeParser::parse($value);

        $this->assertEquals($expected, $discipline);
    }
}
