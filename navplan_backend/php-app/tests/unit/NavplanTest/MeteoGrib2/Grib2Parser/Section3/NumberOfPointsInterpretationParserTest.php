<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Grib2Parser\Section3\NumberOfPointsInterpretationParser;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyNumberOfPointsInterpretation1;
use PHPUnit\Framework\TestCase;


class NumberOfPointsInterpretationParserTest extends TestCase {
    public function test_parse() {
        $value = DummyNumberOfPointsInterpretation1::createValue();
        $expected = DummyNumberOfPointsInterpretation1::create();

        $numberOfPointsInterpretation = NumberOfPointsInterpretationParser::parse($value);

        $this->assertEquals($expected, $numberOfPointsInterpretation);
    }
}
