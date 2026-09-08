<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting;

use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByPositionQuery;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByTextQuery;
use Navplan\Common\Rest\Controller\IRestController;


interface IAerodromeReportingDiContainer
{
    function getReportingPointController(): IRestController;

    function getAerodromeReportingByPositionQuery(): IAerodromeReportingByPositionQuery;

    function getAerodromeReportingByTextQuery(): IAerodromeReportingByTextQuery;
}
