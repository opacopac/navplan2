<?php declare(strict_types=1);

namespace Navplan\Enroute;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Enroute\Domain\Command\INavaidDeleteAllCommand;
use Navplan\Enroute\Domain\Command\INavaidInsertAllCommand;
use Navplan\Enroute\Domain\Query\INavaidSearchByExtentQuery;
use Navplan\Enroute\Domain\Query\INavaidSearchByPositionQuery;
use Navplan\Enroute\Domain\Query\INavaidSearchByTextQuery;
use Navplan\Enroute\Domain\Service\INavaidService;


interface IEnrouteDiContainer
{
    function getNavaidController(): IRestController;

    function getNavaidService(): INavaidService;

    function getNavaidSearchByExtentQuery(): INavaidSearchByExtentQuery;

    function getNavaidSearchByPositionQuery(): INavaidSearchByPositionQuery;

    function getNavaidSearchByTextQuery(): INavaidSearchByTextQuery;

    function getNavaidInsertAllCommand(): INavaidInsertAllCommand;

    function getNavaidDeleteAllCommand(): INavaidDeleteAllCommand;
}
