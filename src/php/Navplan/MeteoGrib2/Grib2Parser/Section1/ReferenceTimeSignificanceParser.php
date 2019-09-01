<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section1;

use Navplan\MeteoGrib2\Domain\Section1\ReferenceTimeSignificance;


class ReferenceTimeSignificanceParser {
    public static function parse(int $value): ReferenceTimeSignificance {
        switch ($value) {
            case 0: return new ReferenceTimeSignificance(ReferenceTimeSignificance::ANALYSIS);
            case 1: return new ReferenceTimeSignificance(ReferenceTimeSignificance::START_OF_FORECAST);
            case 2: return new ReferenceTimeSignificance(ReferenceTimeSignificance::VERIFYING_TIME_OF_FORECAST);
            case 3: return new ReferenceTimeSignificance(ReferenceTimeSignificance::OBSERVATION_TIME);
            case 255: return new ReferenceTimeSignificance(ReferenceTimeSignificance::MISSING);
            default: return new ReferenceTimeSignificance(ReferenceTimeSignificance::UNKNOWN);
        }
    }
}
