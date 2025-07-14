<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Domain\Query;

use Navplan\AerodromeReporting\Domain\Model\ReportingPoint;


interface IAerodromeReportingByTextQuery
{
    /**
     * @param string $searchText
     * @param int $maxResults
     * @return ReportingPoint[]
     */
    function search(string $searchText, int $maxResults): array;
}
