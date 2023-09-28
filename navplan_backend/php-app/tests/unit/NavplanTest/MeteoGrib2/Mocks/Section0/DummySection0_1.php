<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section0;

use Navplan\MeteoGrib2\Domain\Section0\IndicatorSection;


class DummySection0_1 {
    public static function create(): IndicatorSection {
        return new IndicatorSection(
            DummyDiscipline1::create(),
            2
        );
    }


    public static function createData(): string {
        return pack("nCCJ",0, DummyDiscipline1::createValue(), 2, 16);
    }
}
