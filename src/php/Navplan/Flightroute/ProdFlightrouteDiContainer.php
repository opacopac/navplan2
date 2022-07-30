<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Flightroute\Domain\Command\IFlightrouteAddCommand;
use Navplan\Flightroute\Domain\Command\IFlightrouteDeleteCommand;
use Navplan\Flightroute\Domain\Command\IFlightrouteUpdateCommand;
use Navplan\Flightroute\Domain\Command\IWaypointsAddCommand;
use Navplan\Flightroute\Domain\Command\IWaypointsDeleteCommand;
use Navplan\Flightroute\Domain\Query\IFlightrouteByHashQuery;
use Navplan\Flightroute\Domain\Query\IFlightrouteByIdQuery;
use Navplan\Flightroute\Domain\Query\IFlightrouteByShareIdQuery;
use Navplan\Flightroute\Domain\Query\IFlightrouteListQuery;
use Navplan\Flightroute\Domain\Query\IWaypointsByFlightrouteQuery;
use Navplan\Flightroute\Domain\Service\FlightrouteService;
use Navplan\Flightroute\Domain\Service\IFlightrouteService;
use Navplan\Flightroute\Persistence\Command\DbFlightrouteAddCommand;
use Navplan\Flightroute\Persistence\Command\DbFlightrouteDeleteCommand;
use Navplan\Flightroute\Persistence\Command\DbFlightrouteUpdateCommand;
use Navplan\Flightroute\Persistence\Command\DbWaypointsAddCommand;
use Navplan\Flightroute\Persistence\Command\DbWaypointsDeleteCommand;
use Navplan\Flightroute\Persistence\Query\DbFlightrouteByHashQuery;
use Navplan\Flightroute\Persistence\Query\DbFlightrouteByIdQuery;
use Navplan\Flightroute\Persistence\Query\DbFlightrouteByShareIdQuery;
use Navplan\Flightroute\Persistence\Query\DbFlightrouteListQuery;
use Navplan\Flightroute\Persistence\Query\DbWaypointsByFlightrouteQuery;
use Navplan\Flightroute\Rest\Controller\FlightrouteController;
use Navplan\System\DomainService\IDbService;
use Navplan\System\DomainService\IHttpService;
use Navplan\User\DomainService\ITokenService;
use Navplan\User\DomainService\IUserRepo;


class ProdFlightrouteDiContainer implements IFlightrouteDiContainer {
    private IRestController $flightrouteController;
    private IFlightrouteService $flightrouteService;
    private IFlightrouteListQuery $flightrouteListQuery;
    private IFlightrouteByIdQuery $flightrouteByIdQuery;
    private IFlightrouteByShareIdQuery $flightrouteByShareIdQuery;
    private IFlightrouteByHashQuery $flightrouteByHashQuery;
    private IFlightrouteAddCommand $flightrouteAddCommand;
    private IFlightrouteDeleteCommand $flightrouteDeleteCommand;
    private IFlightrouteUpdateCommand $flightrouteUpdateCommand;
    private IWaypointsByFlightrouteQuery $waypointsByFlightrouteQuery;
    private IWaypointsAddCommand $waypointsAddCommand;
    private IWaypointsDeleteCommand $waypointsDeleteCommand;


    public function __construct(
        private ITokenService $tokenService,
        private IUserRepo $userRepo,
        private IDbService $dbService,
        private IHttpService $httpService
    ) {
    }


    public function getFlightrouteController(): IRestController {
        if (!isset($this->flightrouteController)) {
            $this->flightrouteController = new FlightrouteController(
                $this->getFlightrouteService(),
                $this->httpService
            );
        }

        return $this->flightrouteController;
    }


    public function getFlightrouteService(): IFlightrouteService {
        if (!isset($this->flightrouteService)) {
            $this->flightrouteService = new FlightrouteService(
                $this->tokenService,
                $this->userRepo,
                $this->getFlightrouteListQuery(),
                $this->getFlightrouteByIdQuery(),
                $this->getFlightrouteByShareIdQuery(),
                $this->getFlightrouteByHashQuery(),
                $this->getFlightrouteAddCommand(),
                $this->getFlightrouteDeleteCommand(),
                $this->getFlightrouteUpdateCommand()
            );
        }

        return $this->flightrouteService;
    }


    public function getFlightrouteListQuery(): IFlightrouteListQuery {
        if (!isset($this->flightrouteListQuery)) {
            $this->flightrouteListQuery = new DbFlightrouteListQuery(
                $this->dbService
            );
        }

        return $this->flightrouteListQuery;
    }


    public function getFlightrouteByIdQuery(): IFlightrouteByIdQuery {
        if (!isset($this->flightrouteByIdQuery)) {
            $this->flightrouteByIdQuery = new DbFlightrouteByIdQuery(
                $this->dbService,
                $this->getWaypointsByFlightrouteQuery()
            );
        }

        return $this->flightrouteByIdQuery;
    }


    public function getFlightrouteByShareIdQuery(): IFlightrouteByShareIdQuery {
        if (!isset($this->flightrouteByShareIdQuery)) {
            $this->flightrouteByShareIdQuery = new DbFlightrouteByShareIdQuery(
                $this->dbService,
                $this->getWaypointsByFlightrouteQuery()
            );
        }

        return $this->flightrouteByShareIdQuery;
    }


    public function getFlightrouteByHashQuery(): IFlightrouteByHashQuery {
        if (!isset($this->flightrouteByHashQuery)) {
            $this->flightrouteByHashQuery = new DbFlightrouteByHashQuery(
                $this->dbService,
                $this->getWaypointsByFlightrouteQuery()
            );
        }

        return $this->flightrouteByHashQuery;
    }


    public function getFlightrouteAddCommand(): IFlightrouteAddCommand {
        if (!isset($this->flightrouteAddCommand)) {
            $this->flightrouteAddCommand = new DbFlightrouteAddCommand(
                $this->dbService,
                $this->getWaypointsAddCommand()
            );
        }

        return $this->flightrouteAddCommand;
    }


    public function getFlightrouteDeleteCommand(): IFlightrouteDeleteCommand {
        if (!isset($this->flightrouteDeleteCommand)) {
            $this->flightrouteDeleteCommand = new DbFlightrouteDeleteCommand(
                $this->dbService,
                $this->getWaypointsDeleteCommand()
            );
        }

        return $this->flightrouteDeleteCommand;
    }


    public function getFlightrouteUpdateCommand(): IFlightrouteUpdateCommand {
        if (!isset($this->flightrouteUpdateCommand)) {
            $this->flightrouteUpdateCommand = new DbFlightrouteUpdateCommand(
                $this->dbService,
                $this->getWaypointsDeleteCommand(),
                $this->getWaypointsAddCommand()
            );
        }

        return $this->flightrouteUpdateCommand;
    }


    public function getWaypointsByFlightrouteQuery(): IWaypointsByFlightrouteQuery {
        if (!isset($this->waypointsByFlightrouteQuery)) {
            $this->waypointsByFlightrouteQuery = new DbWaypointsByFlightrouteQuery(
                $this->dbService
            );
        }

        return $this->waypointsByFlightrouteQuery;
    }


    public function getWaypointsAddCommand(): IWaypointsAddCommand {
        if (!isset($this->waypointsAddCommand)) {
            $this->waypointsAddCommand = new DbWaypointsAddCommand(
                $this->dbService
            );
        }

        return $this->waypointsAddCommand;
    }


    public function getWaypointsDeleteCommand(): IWaypointsDeleteCommand {
        if (!isset($this->waypointsDeleteCommand)) {
            $this->waypointsDeleteCommand = new DbWaypointsDeleteCommand(
                $this->dbService
            );
        }

        return $this->waypointsDeleteCommand;
    }
}
