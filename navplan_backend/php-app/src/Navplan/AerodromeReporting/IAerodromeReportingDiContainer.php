<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting;

use Navplan\AerodromeReporting\Domain\Service\IReportingPointService;
use Navplan\Common\Rest\Controller\IRestController;


interface IAerodromeReportingDiContainer
{
    function getReportingPointController(): IRestController;

    function getReportingPointService(): IReportingPointService;
}
