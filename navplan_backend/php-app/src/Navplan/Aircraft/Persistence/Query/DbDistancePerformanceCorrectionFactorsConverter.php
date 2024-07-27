<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Query;

use Navplan\Aircraft\Domain\Model\DistancePerformanceCorrectionFactors;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftPerfDist;
use Navplan\Common\Domain\Model\Speed;
use Navplan\Common\Domain\Model\SpeedUnit;


class DbDistancePerformanceCorrectionFactorsConverter
{
    public static function fromDbRow(array $row): DistancePerformanceCorrectionFactors
    {
        return new DistancePerformanceCorrectionFactors(
            floatval($row[DbTableAircraftPerfDist::COL_GRASS_RWY_INC_PERC]),
            floatval($row[DbTableAircraftPerfDist::COL_WET_RWY_INC_PERC]),
            floatval($row[DbTableAircraftPerfDist::COL_HEADWIND_DEC_PERC]),
            new Speed(floatval($row[DbTableAircraftPerfDist::COL_HEADWIND_DEC_PER_SPEED_KT]), SpeedUnit::KT),
            floatval($row[DbTableAircraftPerfDist::COL_TAILWIND_INC_PERC]),
            new Speed(floatval($row[DbTableAircraftPerfDist::COL_TAILWIND_INC_PER_SPEED_KT]), SpeedUnit::KT)
        );
    }
}
