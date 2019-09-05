<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section6;

use Navplan\MeteoGrib2\Domain\Section6\Section6;


class DummySection6_2 {
    public static function create(): Section6 {
        return new Section6(
            0,
            "MEEP"
        );
    }


    public static function createData(): string {
        return pack("NCCa4",10,6, 0, "MEEP");
    }
}
