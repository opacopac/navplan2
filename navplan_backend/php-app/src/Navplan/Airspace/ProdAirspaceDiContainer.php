<?php declare(strict_types=1);

namespace Navplan\Airspace;

use Navplan\Airspace\Domain\Command\IAirspaceDeleteAllCommand;
use Navplan\Airspace\Domain\Command\IAirspaceInsertAllCommand;
use Navplan\Airspace\Domain\Query\IAirspaceSearchByExtentQuery;
use Navplan\Airspace\Domain\Query\IAirspaceSearchByPositionQuery;
use Navplan\Airspace\Domain\Query\IAirspaceSearchByRouteQuery;
use Navplan\Airspace\Domain\Query\IFirReadByIcaoQuery;
use Navplan\Airspace\Domain\Service\AirspaceService;
use Navplan\Airspace\Domain\Service\FirService;
use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\Airspace\Domain\Service\IFirService;
use Navplan\Airspace\Persistence\Command\DbAirspaceDeleteAllCommand;
use Navplan\Airspace\Persistence\Command\DbAirspaceInsertAllCommand;
use Navplan\Airspace\Persistence\Query\DbAirspaceSearchByExtentQuery;
use Navplan\Airspace\Persistence\Query\DbAirspaceSearchByPositionQuery;
use Navplan\Airspace\Persistence\Query\DbAirspaceSearchByRouteQuery;
use Navplan\Airspace\Persistence\Query\DbFirReadByIcaoQuery;
use Navplan\Airspace\Rest\Controller\AirspaceController;
use Navplan\Airspace\Rest\Controller\FirController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\ILoggingService;


class ProdAirspaceDiContainer implements IAirspaceDiContainer
{
    private IRestController $airspaceController;
    private IRestController $firController;
    private IAirspaceService $airspaceService;
    private IFirService $firService;
    private IAirspaceSearchByExtentQuery $airspaceSearchByExtentQuery;
    private IAirspaceSearchByPositionQuery $airspaceSearchByPositionQuery;
    private IAirspaceSearchByRouteQuery $airspaceSearchByRouteQuery;
    private IAirspaceInsertAllCommand $airspaceInsertAllCommand;
    private IAirspaceDeleteAllCommand $airspaceDeleteAllCommand;
    private IFirReadByIcaoQuery $firReadByIcaoQuery;


    public function __construct(
        private ILoggingService $loggingService,
        private IDbService $dbService,
        private IHttpService $httpService
    )
    {
    }


    public function getAirspaceController(): IRestController
    {
        if (!isset($this->airspaceController)) {
            $this->airspaceController = new AirspaceController(
                $this->getAirspaceService(),
                $this->httpService
            );
        }

        return $this->airspaceController;
    }


    public function getFirController(): IRestController
    {
        if (!isset($this->firController)) {
            $this->firController = new FirController(
                $this->getFirService(),
                $this->httpService
            );
        }

        return $this->firController;
    }


    public function getFirService(): IFirService
    {
        if (!isset($this->firService)) {
            $this->firService = new FirService(
                $this->getFirReadByIcaoQuery()
            );
        }

        return $this->firService;
    }


    public function getAirspaceService(): IAirspaceService
    {
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


    public function getAirspaceSearchByExtentQuery(): IAirspaceSearchByExtentQuery
    {
        if (!isset($this->airspaceSearchByExtentQuery)) {
            $this->airspaceSearchByExtentQuery = new DbAirspaceSearchByExtentQuery(
                $this->dbService
            );
        }

        return $this->airspaceSearchByExtentQuery;
    }


    public function getAirspaceSearchByPositionQuery(): IAirspaceSearchByPositionQuery
    {
        if (!isset($this->airspaceSearchByPositionQuery)) {
            $this->airspaceSearchByPositionQuery = new DbAirspaceSearchByPositionQuery(
                $this->dbService
            );
        }

        return $this->airspaceSearchByPositionQuery;
    }


    public function getAirspaceSearchByRouteQuery(): IAirspaceSearchByRouteQuery
    {
        if (!isset($this->airspaceSearchByRouteQuery)) {
            $this->airspaceSearchByRouteQuery = new DbAirspaceSearchByRouteQuery(
                $this->dbService
            );
        }

        return $this->airspaceSearchByRouteQuery;
    }


    public function getAirspaceInsertAllCommand(): IAirspaceInsertAllCommand
    {
        if (!isset($this->airspaceInsertAllCommand)) {
            $this->airspaceInsertAllCommand = new DbAirspaceInsertAllCommand(
                $this->dbService,
                $this->loggingService
            );
        }

        return $this->airspaceInsertAllCommand;
    }


    public function getAirspaceDeleteAllCommand(): IAirspaceDeleteAllCommand
    {
        if (!isset($this->airspaceDeleteAllCommand)) {
            $this->airspaceDeleteAllCommand = new DbAirspaceDeleteAllCommand(
                $this->dbService,
                $this->loggingService
            );
        }

        return $this->airspaceDeleteAllCommand;
    }


    public function getFirReadByIcaoQuery(): IFirReadByIcaoQuery
    {
        if (!isset($this->firReadByIcaoQuery)) {
            $this->firReadByIcaoQuery = new DbFirReadByIcaoQuery(
                $this->dbService
            );
        }

        return $this->firReadByIcaoQuery;
    }
}
