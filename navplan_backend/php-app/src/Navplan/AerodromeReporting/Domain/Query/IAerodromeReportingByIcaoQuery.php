<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Domain\Query;

use Navplan\AerodromeReporting\Domain\Model\ReportingPoint;


interface IAerodromeReportingByIcaoQuery
{
    /**
     * @param string $airportIcao
     * @return ReportingPoint[]
     */
    function read(string $airportIcao): array;
}
