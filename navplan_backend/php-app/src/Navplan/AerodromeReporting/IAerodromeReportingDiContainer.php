<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting;

use Navplan\Common\Rest\Controller\IRestController;


interface IAerodromeReportingDiContainer
{
    function getReportingPointController(): IRestController;
}
