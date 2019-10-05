<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section3;

use Navplan\MeteoGrib2\Domain\Section3\GridDefinitionSection;


class DummySection3_1 {
    public static function create(): GridDefinitionSection {
        return new GridDefinitionSection(
            DummyGridDefinitionSource1::create(),
            25,
            DummyNumberOfPoints1::create(),
            DummyGridDefinitionTemplate20_1::create()
        );
    }


    public static function createData(): string {
        return pack("CNCCn",
                DummyGridDefinitionSource1::createValue(),
                25,
                0, DummyNumberOfPointsInterpretation1::createValue(),
                20
            ) . DummyGridDefinitionTemplate20_1::createData();
    }
}
