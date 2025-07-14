<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Domain\Command;

use Navplan\AerodromeReporting\Domain\Model\ReportingPoint;


interface IAerodromeReportingCreateCommand
{
    function create(ReportingPoint $reportingPoint, int $userId): ReportingPoint;
}
