<?php declare(strict_types=1);

namespace Navplan\Notam;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Notam\Domain\Query\INotamSearchByExtentQuery;
use Navplan\Notam\Domain\Query\INotamSearchByIcaoQuery;
use Navplan\Notam\Domain\Query\INotamSearchByPositionQuery;
use Navplan\Notam\Domain\Query\INotamSearchByRouteQuery;
use Navplan\Notam\Domain\Service\INotamConfig;


interface INotamDiContainer
{
    function getNotamConfig(): INotamConfig;

    function getNotamController(): IRestController;

    function getNotamSearchByExtentQuery(): INotamSearchByExtentQuery;

    function getNotamSearchByIcaoQuery(): INotamSearchByIcaoQuery;

    function getNotamSearchByPositionQuery(): INotamSearchByPositionQuery;

    function getNotamSearchByRouteQuery(): INotamSearchByRouteQuery;
}
