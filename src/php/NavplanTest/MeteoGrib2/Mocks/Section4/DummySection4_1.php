<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section4;

use Navplan\MeteoGrib2\Domain\Section4\Section4;


class DummySection4_1 {
    public static function create(): Section4 {
        return new Section4(
            DummyProductDefinitionTemplate0_1::create(),
            []
        );
    }


    public static function createData(): string {
        return pack("NCnn",34,4, 0, 0)
            . DummyProductDefinitionTemplate0_1::createData();
    }
}
