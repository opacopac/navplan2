<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Flightroute\Domain\Service\IFlightrouteService;


interface IFlightrouteDiContainer {
    function getFlightrouteController(): IRestController;

    function getFlightrouteService(): IFlightrouteService;
}
