<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\Aircraft\Domain\Model\DistancePerformanceCorrectionFactors;
use Navplan\Common\Persistence\Model\DbSpeedConverter;


class DbDistancePerformanceCorrectionFactorsConverter
{
    public static function fromDbRow(array $row): DistancePerformanceCorrectionFactors
    {
        return new DistancePerformanceCorrectionFactors(
            floatval($row[DbTableAircraftPerfDist::COL_GRASS_RWY_INC_PERC]),
            floatval($row[DbTableAircraftPerfDist::COL_WET_RWY_INC_PERC]),
            floatval($row[DbTableAircraftPerfDist::COL_HEADWIND_DEC_PERC]),
            DbSpeedConverter::fromDbRow($row, DbTableAircraftPerfDist::COL_HEADWIND_DEC_PER_SPEED,
                DbTableAircraftPerfDist::COL_SPEED_UNIT),
            floatval($row[DbTableAircraftPerfDist::COL_TAILWIND_INC_PERC]),
            DbSpeedConverter::fromDbRow($row, DbTableAircraftPerfDist::COL_TAILWIND_INC_PER_SPEED,
                DbTableAircraftPerfDist::COL_SPEED_UNIT)
        );
    }
}
