<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;

use Navplan\Aircraft\Domain\Model\DistancePerformanceCorrectionFactors;
use Navplan\Common\Domain\Model\Speed;


class DbDistancePerformanceCorrectionFactorsConverter
{
    public static function fromDbRow(array $row, DbRowAircraftPerfDist $r): DistancePerformanceCorrectionFactors
    {
        return new DistancePerformanceCorrectionFactors(
            $r->getGrassRwyIncPercent(),
            $r->getWetRwyIncPercent(),
            $r->getHeadwindDecPercent(),
            Speed::fromValueAndUnitString($r->getHeadwindDecPerSpeed(), $r->getspeedUnit()),
            $r->getTailwindIncPercent(),
            Speed::fromValueAndUnitString($r->getTailwindIncPerSpeed(), $r->getspeedUnit()),
        );
    }
}
