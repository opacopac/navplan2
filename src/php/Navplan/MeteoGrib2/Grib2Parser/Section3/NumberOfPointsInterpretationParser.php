<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Domain\Section3\NumberOfPointsInterpretation;


class NumberOfPointsInterpretationParser {
    public static function parse(int $value): NumberOfPointsInterpretation {
        switch ($value) {
            case 0: return new NumberOfPointsInterpretation(NumberOfPointsInterpretation::NO_LIST);
            case 1: return new NumberOfPointsInterpretation(NumberOfPointsInterpretation::FULL_COORDINATE_CIRCLES);
            case 2: return new NumberOfPointsInterpretation(NumberOfPointsInterpretation::EXTREME_COORDINATE_VALUES);
            case 255: return new NumberOfPointsInterpretation(NumberOfPointsInterpretation::MISSING);
            default: return new NumberOfPointsInterpretation(NumberOfPointsInterpretation::UNKNOWN);
        }
    }
}
