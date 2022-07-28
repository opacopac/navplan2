<?php declare(strict_types=1);

namespace Navplan\Enroute;

use Navplan\Enroute\Domain\Service\AirspaceServiceImpl;
use Navplan\Enroute\Domain\Service\IAirspaceDeleteAllCommand;
use Navplan\Enroute\Domain\Service\IAirspaceInsertAllCommand;
use Navplan\Enroute\Domain\Service\IAirspaceSearchByExtentQuery;
use Navplan\Enroute\Domain\Service\IAirspaceSearchByPositionQuery;
use Navplan\Enroute\Domain\Service\IAirspaceSearchByRouteQuery;
use Navplan\Enroute\Domain\Service\IAirspaceService;
use Navplan\Enroute\Domain\Service\INavaidService;
use Navplan\Enroute\Persistence\Service\DbAirspaceDeleteAllCommand;
use Navplan\Enroute\Persistence\Service\DbAirspaceInsertAllCommand;
use Navplan\Enroute\Persistence\Service\DbAirspaceSearchByExtentQuery;
use Navplan\Enroute\Persistence\Service\DbAirspaceSearchByPositionQuery;
use Navplan\Enroute\Persistence\Service\DbAirspaceSearchByRouteQuery;
use Navplan\Enroute\Persistence\Service\DbNavaidRepo;
use Navplan\System\DomainService\IDbService;
use Navplan\System\DomainService\ILoggingService;


class ProdEnrouteDiContainer implements IEnrouteDiContainer {
    private IAirspaceService $airspaceService;
    private IAirspaceSearchByExtentQuery $airspaceSearchByExtentQuery;
    private IAirspaceSearchByPositionQuery $airspaceSearchByPositionQuery;
    private IAirspaceSearchByRouteQuery $airspaceSearchByRouteQuery;
    private IAirspaceInsertAllCommand $airspaceInsertAllCommand;
    private IAirspaceDeleteAllCommand $airspaceDeleteAllCommand;
    private INavaidService $navaidService;


    public function __construct(
        private ILoggingService $loggingService,
        private IDbService $dbService
    ) {
    }


    public function getAirspaceService(): IAirspaceService {
        if (!isset($this->airspaceService)) {
            $this->airspaceService = new AirspaceServiceImpl(
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


    public function getNavaidService(): INavaidService {
        if (!isset($this->navaidService)) {
            $this->navaidService = new DbNavaidRepo(
                $this->dbService,
                $this->loggingService
            );
        }

        return $this->navaidService;
    }
}
