<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestService;

use Navplan\Flightroute\UseCase\CreateFlightroute\ICreateFlightrouteUc;
use Navplan\Flightroute\UseCase\CreateSharedFlightroute\ICreateSharedFlightrouteUc;
use Navplan\Flightroute\UseCase\DeleteFlightroute\IDeleteFlightrouteUc;
use Navplan\Flightroute\UseCase\ReadFlightroute\IReadFlightrouteUc;
use Navplan\Flightroute\UseCase\ReadFlightrouteList\IReadFlightrouteListUc;
use Navplan\Flightroute\UseCase\ReadSharedFlightroute\IReadSharedFlightrouteUc;
use Navplan\Flightroute\UseCase\UpdateFlightroute\IUpdateFlightrouteUc;
use Navplan\System\DomainService\IHttpService;


interface IFlightrouteServiceDiContainer {
    function getHttpService(): IHttpService;

    function getCreateFlightrouteUc(): ICreateFlightrouteUc;

    function getCreateSharedFlightrouteUc(): ICreateSharedFlightrouteUc;

    function getDeleteFlightrouteUc(): IDeleteFlightrouteUc;

    function getReadFlightrouteUc(): IReadFlightrouteUc;

    function getReadFlightrouteListUc(): IReadFlightrouteListUc;

    function getReadSharedFlightrouteUc(): IReadSharedFlightrouteUc;

    function getUpdateFlightrouteUc(): IUpdateFlightrouteUc;
}
