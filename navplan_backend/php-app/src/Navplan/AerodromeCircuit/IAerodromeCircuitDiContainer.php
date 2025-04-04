<?php declare(strict_types=1);

namespace Navplan\AerodromeCircuit;

use Navplan\AerodromeCircuit\Domain\Service\IAirportCircuitService;
use Navplan\Common\Rest\Controller\IRestController;


interface IAerodromeCircuitDiContainer
{
    function getAirportCircuitController(): IRestController;

    function getAirportCircuitService(): IAirportCircuitService;
}
