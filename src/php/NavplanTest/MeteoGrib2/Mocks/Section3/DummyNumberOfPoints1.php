<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section3;

use Navplan\MeteoGrib2\Domain\Section3\NumberOfPoints;


class DummyNumberOfPoints1 {
    public static function create(): NumberOfPoints {
        return new NumberOfPoints(
            0,
            DummyNumberOfPointsInterpretation1::create(),
            []
        );
    }
}
