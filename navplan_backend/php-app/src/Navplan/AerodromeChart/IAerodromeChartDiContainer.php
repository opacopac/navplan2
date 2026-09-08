<?php declare(strict_types=1);

namespace Navplan\AerodromeChart;

use Navplan\Common\Rest\Controller\IRestController;


interface IAerodromeChartDiContainer
{
    function getAirportChartController(): IRestController;
}
