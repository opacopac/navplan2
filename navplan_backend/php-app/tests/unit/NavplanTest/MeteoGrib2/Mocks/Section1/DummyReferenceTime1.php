<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section1;

use DateTime;
use Navplan\MeteoGrib2\Domain\Section1\ReferenceTime;


class DummyReferenceTime1 {
    public static function create(): ReferenceTime {
        return new ReferenceTime(
            DummyReferenceTimeSignificance1::create(),
            DateTime::createFromFormat('Y-m-d H:i:s', '2019-08-26 14:03:34')
        );
    }


    public static function createData(): string {
        return pack("CnCCCCC",
            DummyReferenceTimeSignificance1::createValue(),
            2019, 8, 26, 14, 3, 34
        );
    }
}
