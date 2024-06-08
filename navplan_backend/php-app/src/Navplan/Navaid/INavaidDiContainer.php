<?php declare(strict_types=1);

namespace Navplan\Navaid;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Navaid\Domain\Command\INavaidDeleteAllCommand;
use Navplan\Navaid\Domain\Command\INavaidInsertAllCommand;
use Navplan\Navaid\Domain\Query\INavaidSearchByExtentQuery;
use Navplan\Navaid\Domain\Query\INavaidSearchByPositionQuery;
use Navplan\Navaid\Domain\Query\INavaidSearchByTextQuery;
use Navplan\Navaid\Domain\Service\INavaidService;


interface INavaidDiContainer
{
    function getNavaidController(): IRestController;

    function getNavaidService(): INavaidService;

    function getNavaidSearchByExtentQuery(): INavaidSearchByExtentQuery;

    function getNavaidSearchByPositionQuery(): INavaidSearchByPositionQuery;

    function getNavaidSearchByTextQuery(): INavaidSearchByTextQuery;

    function getNavaidInsertAllCommand(): INavaidInsertAllCommand;

    function getNavaidDeleteAllCommand(): INavaidDeleteAllCommand;
}
