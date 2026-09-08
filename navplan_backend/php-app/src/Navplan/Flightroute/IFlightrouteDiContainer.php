<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use Navplan\Common\Rest\Controller\IRestController;


interface IFlightrouteDiContainer {
    function getFlightrouteController(): IRestController;
}
