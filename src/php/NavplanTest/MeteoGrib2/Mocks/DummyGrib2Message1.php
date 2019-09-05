<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks;

use Navplan\MeteoGrib2\Domain\Grib2Message;
use NavplanTest\MeteoGrib2\Mocks\Section0\DummySection0_1;
use NavplanTest\MeteoGrib2\Mocks\Section1\DummySection1_1;
use NavplanTest\MeteoGrib2\Mocks\Section2\DummySection2_1;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummySection3_1;
use NavplanTest\MeteoGrib2\Mocks\Section4\DummySection4_1;
use NavplanTest\MeteoGrib2\Mocks\Section5\DummySection5_1;
use NavplanTest\MeteoGrib2\Mocks\Section6\DummySection6_1;
use NavplanTest\MeteoGrib2\Mocks\Section7\DummySection7_1;
use NavplanTest\MeteoGrib2\Mocks\Section8\DummySection8_1;


class DummyGrib2Message1 {
    public static function create(): Grib2Message {
        return new Grib2Message(
            DummySection0_1::create(),
            DummySection1_1::create(),
            DummySection2_1::create(),
            DummySection3_1::create(),
            DummySection4_1::create(),
            DummySection5_1::create(),
            DummySection6_1::create(),
            DummySection7_1::create()
        );
    }



    public static function createData(): string {
        return DummySection0_1::createData()
            . DummySection1_1::createData()
            . DummySection3_1::createData()
            . DummySection4_1::createData()
            . DummySection5_1::createData()
            . DummySection6_1::createData()
            . DummySection7_1::createData()
            . DummySection8_1::createData();
    }
}
