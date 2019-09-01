<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section0;

use Navplan\MeteoGrib2\Grib2Parser\Section1\DataTypeParser;
use NavplanTest\MeteoGrib2\Mocks\Section1\DummyDataType1;
use PHPUnit\Framework\TestCase;


class DataTypeParserTest extends TestCase {
    public function test_parse() {
        $value = DummyDataType1::createValue();
        $expected = DummyDataType1::create();

        $dataType = DataTypeParser::parse($value);

        $this->assertEquals($expected, $dataType);
    }
}
