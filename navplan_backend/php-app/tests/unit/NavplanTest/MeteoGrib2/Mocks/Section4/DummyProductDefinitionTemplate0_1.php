<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section4;

use DateInterval;
use Navplan\MeteoGrib2\Domain\Section4\ProductDefinitionTemplate0;


class DummyProductDefinitionTemplate0_1 {
    public static function create(): ProductDefinitionTemplate0 {
        return new ProductDefinitionTemplate0(
            DummyParameter1::create(),
            DummyGeneratingProcess1::create(),
            new DateInterval("PT3H30M"),
            DummyForecastTime::create(),
            DummyFixedSurface1::create(),
            DummyFixedSurface2::create()
        );
    }


    public static function createData(): string {
        return DummyParameter1::createData()
            . DummyGeneratingProcess1::createData()
            . pack("nC", 3, 30)
            . DummyForecastTime::createData()
            . DummyFixedSurface1::createData()
            . DummyFixedSurface2::createData();
    }
}
