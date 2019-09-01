<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section1;

use DateTime;
use Navplan\MeteoGrib2\Domain\Section1\Section1;


class DummySection1_1 {
    public static function create(): Section1 {
        return new Section1(
            215,
            4,
            2,
            0,
            DummyReferenceTimeSignificance1::create(),
            DateTime::createFromFormat('Y-m-d H:i:s', '2019-08-26 14:03:34'),
            DummyProductionStatus1::create(),
            DummyDataType1::create()
        );
    }


    public static function createData(): string {
        return pack("NCnnCCCnCCCCCCC",21, 1,
            215, 4, 2, 0,
            DummyReferenceTimeSignificance1::createValue(),
            2019, 8, 26, 14, 3, 34,
            DummyProductionStatus1::createValue(),
            DummyDataType1::createValue());
    }
}
