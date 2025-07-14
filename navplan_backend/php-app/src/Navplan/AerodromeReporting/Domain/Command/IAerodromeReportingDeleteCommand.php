<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Domain\Command;


interface IAerodromeReportingDeleteCommand
{
    function delete(int $reportingPointId, int $userId);
}
