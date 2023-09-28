<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section1;

use Navplan\MeteoGrib2\Domain\Section1\IdentificationSection;
use Navplan\MeteoGrib2\Domain\Section1\Origin;
use Navplan\MeteoGrib2\Domain\Section1\TableVersion;


class DummySection1_1 {
    public static function create(): IdentificationSection {
        return new IdentificationSection(
            new Origin(215, 4),
            new TableVersion(2, 0),
            DummyReferenceTime1::create(),
            DummyProductionStatus1::create(),
            DummyDataType1::create()
        );
    }


    public static function createData(): string {
        return pack("nnCC", 215, 4, 2, 0)
            . DummyReferenceTime1::createData()
            . pack("CC",
                DummyProductionStatus1::createValue(),
                DummyDataType1::createValue()
            );
    }
}
