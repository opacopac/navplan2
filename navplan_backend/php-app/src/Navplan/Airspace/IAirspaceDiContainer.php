<?php declare(strict_types=1);

namespace Navplan\Airspace;

use Navplan\Airspace\Domain\Command\IAirspaceDeleteAllCommand;
use Navplan\Airspace\Domain\Command\IAirspaceInsertAllCommand;
use Navplan\Airspace\Domain\Query\IAirspaceSearchByExtentQuery;
use Navplan\Airspace\Domain\Query\IAirspaceSearchByPositionQuery;
use Navplan\Airspace\Domain\Query\IAirspaceSearchByRouteQuery;
use Navplan\Airspace\Domain\Query\IFirReadByIcaoQuery;
use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\Airspace\Domain\Service\IFirService;
use Navplan\Common\Rest\Controller\IRestController;


interface IAirspaceDiContainer
{
    function getAirspaceController(): IRestController;

    function getAirspaceService(): IAirspaceService;

    function getAirspaceSearchByExtentQuery(): IAirspaceSearchByExtentQuery;

    function getAirspaceSearchByPositionQuery(): IAirspaceSearchByPositionQuery;

    function getAirspaceSearchByRouteQuery(): IAirspaceSearchByRouteQuery;

    function getAirspaceInsertAllCommand(): IAirspaceInsertAllCommand;

    function getAirspaceDeleteAllCommand(): IAirspaceDeleteAllCommand;

    function getFirReadByIcaoQuery(): IFirReadByIcaoQuery;

    function getFirService(): IFirService;

    function getFirController(): IRestController;
}
