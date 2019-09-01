<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Grib2Parser\Section0;

use Navplan\MeteoGrib2\Grib2Parser\Section1\ProductionStatusParser;
use NavplanTest\MeteoGrib2\Mocks\Section1\DummyProductionStatus1;
use PHPUnit\Framework\TestCase;


class ProductionStatusTest extends TestCase {
    public function test_parse() {
        $value = DummyProductionStatus1::createValue();
        $expected = DummyProductionStatus1::create();

        $productionStatus = ProductionStatusParser::parse($value);

        $this->assertEquals($expected, $productionStatus);
    }
}
