<?php declare(strict_types=1);

namespace Navplan\Enroute;

use Navplan\Enroute\Domain\Service\IAirspaceDeleteAllCommand;
use Navplan\Enroute\Domain\Service\IAirspaceInsertAllCommand;
use Navplan\Enroute\Domain\Service\IAirspaceSearchByExtentQuery;
use Navplan\Enroute\Domain\Service\IAirspaceSearchByPositionQuery;
use Navplan\Enroute\Domain\Service\IAirspaceSearchByRouteQuery;
use Navplan\Enroute\Domain\Service\IAirspaceService;
use Navplan\Enroute\Domain\Service\INavaidService;


interface IEnrouteDiContainer {
    function getAirspaceService(): IAirspaceService;

    function getAirspaceSearchByExtentQuery(): IAirspaceSearchByExtentQuery;

    function getAirspaceSearchByPositionQuery(): IAirspaceSearchByPositionQuery;

    function getAirspaceSearchByRouteQuery(): IAirspaceSearchByRouteQuery;

    function getAirspaceInsertAllCommand(): IAirspaceInsertAllCommand;

    function getAirspaceDeleteAllCommand(): IAirspaceDeleteAllCommand;

    function getNavaidService(): INavaidService;
}
