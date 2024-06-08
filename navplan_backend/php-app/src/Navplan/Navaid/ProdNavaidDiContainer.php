<?php declare(strict_types=1);

namespace Navplan\Navaid;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Navaid\Domain\Command\INavaidDeleteAllCommand;
use Navplan\Navaid\Domain\Command\INavaidInsertAllCommand;
use Navplan\Navaid\Domain\Query\INavaidSearchByExtentQuery;
use Navplan\Navaid\Domain\Query\INavaidSearchByPositionQuery;
use Navplan\Navaid\Domain\Query\INavaidSearchByTextQuery;
use Navplan\Navaid\Domain\Service\INavaidService;
use Navplan\Navaid\Domain\Service\NavaidService;
use Navplan\Navaid\Persistence\Command\DbNavaidDeleteAllCommand;
use Navplan\Navaid\Persistence\Command\DbNavaidInsertAllCommand;
use Navplan\Navaid\Persistence\Query\DbNavaidSearchByExtentQuery;
use Navplan\Navaid\Persistence\Query\DbNavaidSearchByPositionQuery;
use Navplan\Navaid\Persistence\Query\DbNavaidSearchByTextQuery;
use Navplan\Navaid\Rest\Controller\NavaidController;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\ILoggingService;


class ProdNavaidDiContainer implements INavaidDiContainer
{
    private IRestController $navaidController;
    private INavaidService $navaidService;
    private INavaidSearchByExtentQuery $navaidSearchByExtentQuery;
    private INavaidSearchByPositionQuery $navaidSearchByPositionQuery;
    private INavaidSearchByTextQuery $navaidSearchByTextQuery;
    private INavaidInsertAllCommand $navaidInsertAllCommand;
    private INavaidDeleteAllCommand $navaidDeleteAllCommand;


    public function __construct(
        private ILoggingService $loggingService,
        private IDbService $dbService,
        private IHttpService $httpService
    )
    {
    }


    public function getNavaidController(): IRestController
    {
        if (!isset($this->navaidController)) {
            $this->navaidController = new NavaidController(
                $this->getNavaidService(),
                $this->httpService
            );
        }

        return $this->navaidController;
    }


    public function getNavaidService(): INavaidService
    {
        if (!isset($this->navaidService)) {
            $this->navaidService = new NavaidService(
                $this->getNavaidSearchByExtentQuery(),
                $this->getNavaidSearchByPositionQuery(),
                $this->getNavaidSearchByTextQuery(),
                $this->getNavaidInsertAllCommand(),
                $this->getNavaidDeleteAllCommand()
            );
        }

        return $this->navaidService;
    }


    public function getNavaidSearchByExtentQuery(): INavaidSearchByExtentQuery
    {
        if (!isset($this->navaidSearchByExtentQuery)) {
            $this->navaidSearchByExtentQuery = new DbNavaidSearchByExtentQuery(
                $this->dbService
            );
        }

        return $this->navaidSearchByExtentQuery;
    }


    public function getNavaidSearchByPositionQuery(): INavaidSearchByPositionQuery
    {
        if (!isset($this->navaidSearchByPositionQuery)) {
            $this->navaidSearchByPositionQuery = new DbNavaidSearchByPositionQuery(
                $this->dbService
            );
        }

        return $this->navaidSearchByPositionQuery;
    }


    public function getNavaidSearchByTextQuery(): INavaidSearchByTextQuery
    {
        if (!isset($this->navaidSearchByTextQuery)) {
            $this->navaidSearchByTextQuery = new DbNavaidSearchByTextQuery(
                $this->dbService
            );
        }

        return $this->navaidSearchByTextQuery;
    }


    public function getNavaidInsertAllCommand(): INavaidInsertAllCommand
    {
        if (!isset($this->navaidInsertAllCommand)) {
            $this->navaidInsertAllCommand = new DbNavaidInsertAllCommand(
                $this->dbService,
                $this->loggingService
            );
        }

        return $this->navaidInsertAllCommand;
    }


    public function getNavaidDeleteAllCommand(): INavaidDeleteAllCommand
    {
        if (!isset($this->navaidDeleteAllCommand)) {
            $this->navaidDeleteAllCommand = new DbNavaidDeleteAllCommand(
                $this->dbService
            );
        }

        return $this->navaidDeleteAllCommand;
    }
}
