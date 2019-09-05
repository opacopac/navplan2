<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section5;

use Navplan\MeteoGrib2\Domain\Section5\Section5;


class DummySection5_1 {
    public static function create(): Section5 {
        return new Section5(
            25,
            DummyDataRepresentationTemplate0_1::create()
        );
    }


    public static function createData(): string {
        return pack("NCNn",21,5, 25, 0)
            . DummyDataRepresentationTemplate0_1::createData();
    }
}
