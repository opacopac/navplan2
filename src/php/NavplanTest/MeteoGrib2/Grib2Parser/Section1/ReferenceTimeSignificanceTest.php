<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section0;

use Navplan\MeteoGrib2\Grib2Parser\Section1\ReferenceTimeSignificanceParser;
use NavplanTest\MeteoGrib2\Mocks\Section1\DummyReferenceTimeSignificance1;
use PHPUnit\Framework\TestCase;


class ReferenceTimeSignificanceTest extends TestCase {
    public function test_parse() {
        $value = DummyReferenceTimeSignificance1::createValue();
        $expected = DummyReferenceTimeSignificance1::create();

        $refTime = ReferenceTimeSignificanceParser::parse($value);

        $this->assertEquals($expected, $refTime);
    }
}
