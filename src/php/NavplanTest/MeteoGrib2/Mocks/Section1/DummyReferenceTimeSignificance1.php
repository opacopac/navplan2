<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section1;

use Navplan\MeteoGrib2\Domain\Section1\ReferenceTimeSignificance;


class DummyReferenceTimeSignificance1 {
    public static function create(): ReferenceTimeSignificance {
        return new ReferenceTimeSignificance(ReferenceTimeSignificance::START_OF_FORECAST);
    }


    public static function createValue(): int {
        return 1;
    }
}
