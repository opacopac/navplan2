<?php declare(strict_types=1);

namespace Navplan\Notam;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Notam\Domain\Query\INotamSearchByPositionQuery;
use Navplan\Notam\IcaoImporter\INotamGeometryParser;


interface INotamDiContainer
{
    function getNotamController(): IRestController;

    function getNotamSearchByPositionQuery(): INotamSearchByPositionQuery;

    function getNotamGeometryParser(): INotamGeometryParser;
}


