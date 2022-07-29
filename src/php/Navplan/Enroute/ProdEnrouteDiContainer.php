<?php declare(strict_types=1);

namespace Navplan\Enroute;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Enroute\Domain\Command\IAirspaceDeleteAllCommand;
use Navplan\Enroute\Domain\Command\IAirspaceInsertAllCommand;
use Navplan\Enroute\Domain\Command\INavaidDeleteAllCommand;
use Navplan\Enroute\Domain\Command\INavaidInsertAllCommand;
use Navplan\Enroute\Domain\Query\IAirspaceSearchByExtentQuery;
use Navplan\Enroute\Domain\Query\IAirspaceSearchByPositionQuery;
use Navplan\Enroute\Domain\Query\IAirspaceSearchByRouteQuery;
use Navplan\Enroute\Domain\Query\INavaidSearchByExtentQuery;
use Navplan\Enroute\Domain\Query\INavaidSearchByPositionQuery;
use Navplan\Enroute\Domain\Query\INavaidSearchByTextQuery;
use Navplan\Enroute\Domain\Service\AirspaceService;
use Navplan\Enroute\Domain\Service\IAirspaceService;
use Navplan\Enroute\Domain\Service\INavaidService;
use Navplan\Enroute\Domain\Service\NavaidService;
use Navplan\Enroute\Persistence\Command\DbAirspaceDeleteAllCommand;
use Navplan\Enroute\Persistence\Command\DbAirspaceInsertAllCommand;
use Navplan\Enroute\Persistence\Command\DbNavaidDeleteAllCommand;
use Navplan\Enroute\Persistence\Command\DbNavaidInsertAllCommand;
use Navplan\Enroute\Persistence\Query\DbAirspaceSearchByExtentQuery;
use Navplan\Enroute\Persistence\Query\DbAirspaceSearchByPositionQuery;
use Navplan\Enroute\Persistence\Query\DbAirspaceSearchByRouteQuery;
use Navplan\Enroute\Persistence\Query\DbNavaidSearchByExtentQuery;
use Navplan\Enroute\Persistence\Query\DbNavaidSearchByPositionQuery;
use Navplan\Enroute\Persistence\Query\DbNavaidSearchByTextQuery;
use Navplan\Enroute\Rest\Controller\AirspaceController;
use Navplan\Enroute\Rest\Controller\NavaidController;
use Navplan\System\DomainService\IDbService;
use Navplan\System\DomainService\IHttpService;
use Navplan\System\DomainService\ILoggingService;


class ProdEnrouteDiContainer implements IEnrouteDiContainer {
    private IRestController $airspaceController;
    private IAirspaceService $airspaceService;
    private IAirspaceSearchByExtentQuery $airspaceSearchByExtentQuery;
    private IAirspaceSearchByPositionQuery $airspaceSearchByPositionQuery;
    private IAirspaceSearchByRouteQuery $airspaceSearchByRouteQuery;
    private IAirspaceInsertAllCommand $airspaceInsertAllCommand;
    private IAirspaceDeleteAllCommand $airspaceDeleteAllCommand;

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
    ) {
    }


    public function getAirspaceController(): IRestController {
        if (!isset($this->airspaceController)) {
            $this->airspaceController = new AirspaceController(
                $this->getAirspaceService(),
                $this->httpService
            );
        }

        return $this->airspaceController;
    }


    public function getAirspaceService(): IAirspaceService {
        if (!isset($this->airspaceService)) {
            $this->airspaceService = new AirspaceService(
                $this->getAirspaceSearchByExtentQuery(),
                $this->getAirspaceSearchByRouteQuery(),
                $this->getAirspaceSearchByPositionQuery(),
                $this->getAirspaceInsertAllCommand(),
                $this->getAirspaceDeleteAllCommand()
            );
        }

        return $this->airspaceService;
    }


    public function getAirspaceSearchByExtentQuery(): IAirspaceSearchByExtentQuery {
        if (!isset($this->airspaceSearchByExtentQuery)) {
            $this->airspaceSearchByExtentQuery = new DbAirspaceSearchByExtentQuery(
                $this->dbService
            );
        }

        return $this->airspaceSearchByExtentQuery;
    }


    public function getAirspaceSearchByPositionQuery(): IAirspaceSearchByPositionQuery {
        if (!isset($this->airspaceSearchByPositionQuery)) {
            $this->airspaceSearchByPositionQuery = new DbAirspaceSearchByPositionQuery(
                $this->dbService
            );
        }

        return $this->airspaceSearchByPositionQuery;
    }


    public function getAirspaceSearchByRouteQuery(): IAirspaceSearchByRouteQuery {
        if (!isset($this->airspaceSearchByRouteQuery)) {
            $this->airspaceSearchByRouteQuery = new DbAirspaceSearchByRouteQuery(
                $this->dbService
            );
        }

        return $this->airspaceSearchByRouteQuery;
    }


    public function getAirspaceInsertAllCommand(): IAirspaceInsertAllCommand {
        if (!isset($this->airspaceInsertAllCommand)) {
            $this->airspaceInsertAllCommand = new DbAirspaceInsertAllCommand(
                $this->dbService,
                $this->loggingService
            );
        }

        return $this->airspaceInsertAllCommand;
    }


    public function getAirspaceDeleteAllCommand(): IAirspaceDeleteAllCommand {
        if (!isset($this->airspaceDeleteAllCommand)) {
            $this->airspaceDeleteAllCommand = new DbAirspaceDeleteAllCommand(
                $this->dbService,
                $this->loggingService
            );
        }

        return $this->airspaceDeleteAllCommand;
    }


    public function getNavaidController(): IRestController {
        if (!isset($this->navaidController)) {
            $this->navaidController = new NavaidController(
                $this->getNavaidService(),
                $this->httpService
            );
        }

        return $this->navaidController;
    }


    public function getNavaidService(): INavaidService {
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


    public function getNavaidSearchByExtentQuery(): INavaidSearchByExtentQuery {
        if (!isset($this->navaidSearchByExtentQuery)) {
            $this->navaidSearchByExtentQuery = new DbNavaidSearchByExtentQuery(
                $this->dbService
            );
        }

        return $this->navaidSearchByExtentQuery;
    }


    public function getNavaidSearchByPositionQuery(): INavaidSearchByPositionQuery {
        if (!isset($this->navaidSearchByPositionQuery)) {
            $this->navaidSearchByPositionQuery = new DbNavaidSearchByPositionQuery(
                $this->dbService
            );
        }

        return $this->navaidSearchByPositionQuery;
    }


    public function getNavaidSearchByTextQuery(): INavaidSearchByTextQuery {
        if (!isset($this->navaidSearchByTextQuery)) {
            $this->navaidSearchByTextQuery = new DbNavaidSearchByTextQuery(
                $this->dbService
            );
        }

        return $this->navaidSearchByTextQuery;
    }


    public function getNavaidInsertAllCommand(): INavaidInsertAllCommand {
        if (!isset($this->navaidInsertAllCommand)) {
            $this->navaidInsertAllCommand = new DbNavaidInsertAllCommand(
                $this->dbService,
                $this->loggingService
            );
        }

        return $this->navaidInsertAllCommand;
    }


    public function getNavaidDeleteAllCommand(): INavaidDeleteAllCommand {
        if (!isset($this->navaidDeleteAllCommand)) {
            $this->navaidDeleteAllCommand = new DbNavaidDeleteAllCommand(
                $this->dbService
            );
        }

        return $this->navaidDeleteAllCommand;
    }
}
