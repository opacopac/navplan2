<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use Navplan\Flightroute\DomainService\IFlightrouteService;


interface IFlightrouteDiContainer {
    function getFlightrouteService(): IFlightrouteService;
}
