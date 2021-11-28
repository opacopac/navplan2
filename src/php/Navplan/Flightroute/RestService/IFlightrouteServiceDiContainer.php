<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestService;

use Navplan\Flightroute\DomainService\IFlightrouteService;
use Navplan\System\DomainService\IHttpService;


interface IFlightrouteServiceDiContainer {
    function getHttpService(): IHttpService;

    function getFlightrouteService(): IFlightrouteService;
}
