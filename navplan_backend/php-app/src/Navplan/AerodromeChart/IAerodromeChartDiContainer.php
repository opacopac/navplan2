<?php declare(strict_types=1);

namespace Navplan\AerodromeChart;

use Navplan\AerodromeChart\Domain\Service\IAirportChartRepo;
use Navplan\AerodromeChart\Domain\Service\IAirportChartService;
use Navplan\Common\Rest\Controller\IRestController;


interface IAerodromeChartDiContainer
{
    function getAirportChartController(): IRestController;

    function getAirportChartService(): IAirportChartService;

    function getAirportChartRepo(): IAirportChartRepo;
}
