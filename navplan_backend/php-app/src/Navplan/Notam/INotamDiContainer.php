<?php declare(strict_types=1);

namespace Navplan\Notam;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Notam\Domain\Command\INotamGeometryDeleteAllCommand;
use Navplan\Notam\Domain\Query\INotamSearchByExtentQuery;
use Navplan\Notam\Domain\Query\INotamSearchByIcaoQuery;
use Navplan\Notam\Domain\Query\INotamSearchByPositionQuery;
use Navplan\Notam\Domain\Query\INotamSearchByRouteQuery;
use Navplan\Notam\Domain\Query\IReadNotamChunkQuery;
use Navplan\Notam\Domain\Query\IReadNotamsByKeyQuery;
use Navplan\Notam\Domain\Service\INotamConfig;
use Navplan\Notam\Domain\Service\INotamService;


interface INotamDiContainer
{
    function getNotamConfig(): INotamConfig;

    function getNotamController(): IRestController;

    function getNotamService(): INotamService;

    function getNotamSearchByExtentQuery(): INotamSearchByExtentQuery;

    function getNotamSearchByIcaoQuery(): INotamSearchByIcaoQuery;

    function getNotamSearchByPositionQuery(): INotamSearchByPositionQuery;

    function getNotamSearchByRouteQuery(): INotamSearchByRouteQuery;

    function getReadNotamsByKeyQuery(): IReadNotamsByKeyQuery;

    function getReadNotamChunkQuery(): IReadNotamChunkQuery;

    function getNotamGeometryDeleteAllCommand(): INotamGeometryDeleteAllCommand;
}
