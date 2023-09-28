<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section4;

use Navplan\MeteoGrib2\Domain\Section4\ProductDefinitionSection;


class DummySection4_1 {
    public static function create(): ProductDefinitionSection {
        return new ProductDefinitionSection(
            DummyProductDefinitionTemplate0_1::create(),
            []
        );
    }


    public static function createData(): string {
        return pack("nn",0, 0)
            . DummyProductDefinitionTemplate0_1::createData();
    }
}
