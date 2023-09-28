<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section3;

use Navplan\MeteoGrib2\Domain\Section3\NumberOfPointsInterpretation;


class DummyNumberOfPointsInterpretation1 {
    public static function create(): NumberOfPointsInterpretation {
        return new NumberOfPointsInterpretation(NumberOfPointsInterpretation::NO_LIST);
    }


    public static function createValue(): int {
        return 0;
    }
}
