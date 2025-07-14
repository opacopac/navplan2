<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Domain\Query;

use Navplan\AerodromeReporting\Domain\Model\ReportingPoint;
use Navplan\Common\Domain\Model\Position2d;


interface IAerodromeReportingByPositionQuery
{
    /**
     * @param Position2d $position
     * @param float $maxRadius_deg
     * @param int $maxResults
     * @return ReportingPoint[]
     */
    function search(Position2d $position, float $maxRadius_deg, int $maxResults): array;
}
