<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Flightroute\Domain\Command\IFlightrouteAddCommand;
use Navplan\Flightroute\Domain\Command\IFlightrouteDeleteCommand;
use Navplan\Flightroute\Domain\Command\IFlightrouteUpdateCommand;
use Navplan\Flightroute\Domain\Command\IWaypointsAddCommand;
use Navplan\Flightroute\Domain\Command\IWaypointsDeleteCommand;
use Navplan\Flightroute\Domain\Query\IFlightrouteByHashQuery;
use Navplan\Flightroute\Domain\Query\IFlightrouteByIdQuery;
use Navplan\Flightroute\Domain\Query\IFlightrouteByShareIdQuery;
use Navplan\Flightroute\Domain\Query\IFlightrouteListQuery;
use Navplan\Flightroute\Domain\Query\IWaypointsByFlightrouteQuery;
use Navplan\Flightroute\Domain\Service\IFlightrouteService;


interface IFlightrouteDiContainer {
    function getFlightrouteController(): IRestController;

    function getFlightrouteService(): IFlightrouteService;

    function getFlightrouteListQuery(): IFlightrouteListQuery;

    function getFlightrouteByIdQuery(): IFlightrouteByIdQuery;

    function getFlightrouteByShareIdQuery(): IFlightrouteByShareIdQuery;

    function getFlightrouteByHashQuery(): IFlightrouteByHashQuery;

    function getFlightrouteAddCommand(): IFlightrouteAddCommand;

    function getFlightrouteDeleteCommand(): IFlightrouteDeleteCommand;

    function getFlightrouteUpdateCommand(): IFlightrouteUpdateCommand;

    function getWaypointsByFlightrouteQuery(): IWaypointsByFlightrouteQuery;

    function getWaypointsAddCommand(): IWaypointsAddCommand;

    function getWaypointsDeleteCommand(): IWaypointsDeleteCommand;
}
