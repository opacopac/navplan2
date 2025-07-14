<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Domain\Query;

use Navplan\AerodromeReporting\Domain\Model\ReportingPoint;
use Navplan\Common\Domain\Model\Extent2d;


interface IAerodromeReportingByExtentQuery
{
    /**
     * @param Extent2d $extent
     * @return ReportingPoint[]
     */
    function search(Extent2d $extent): array;
}
