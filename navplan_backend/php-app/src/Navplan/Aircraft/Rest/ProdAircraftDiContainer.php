<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest;

use Navplan\Aircraft\Domain\Command\IAircraftCreateCommand;
use Navplan\Aircraft\Domain\Command\IAircraftDeleteCommand;
use Navplan\Aircraft\Domain\Command\IAircraftUpdateCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableCreateCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableDeleteCommand;
use Navplan\Aircraft\Domain\Query\IAircraftByIdQuery;
use Navplan\Aircraft\Domain\Query\IAircraftListQuery;
use Navplan\Aircraft\Domain\Service\AircraftService;
use Navplan\Aircraft\Domain\Service\IAircraftService;
use Navplan\Aircraft\Persistence\Command\DbAircraftCreateCommand;
use Navplan\Aircraft\Persistence\Command\DbAircraftDeleteCommand;
use Navplan\Aircraft\Persistence\Command\DbAircraftUpdateCommand;
use Navplan\Aircraft\Persistence\Command\DbDistancePerformanceTableCreateCommand;
use Navplan\Aircraft\Persistence\Command\DbDistancePerformanceTableDeleteCommand;
use Navplan\Aircraft\Persistence\Query\DbAircraftByIdQuery;
use Navplan\Aircraft\Persistence\Query\DbAircraftListQuery;
use Navplan\Aircraft\Rest\Controller\AircraftController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\User\Domain\Service\IUserService;


class ProdAircraftDiContainer implements IAircraftDiContainer
{
    private IRestController $aircraftController;
    private IAircraftService $aircraftService;
    private IAircraftListQuery $aircraftListQuery;
    private IAircraftByIdQuery $aircraftByIdQuery;
    private IAircraftCreateCommand $aircraftCreateCommand;
    private IAircraftUpdateCommand $aircraftUpdateCommand;
    private IAircraftDeleteCommand $aircraftDeleteCommand;
    private IDistancePerformanceTableCreateCommand $distancePerformanceTableCreateCommand;
    private IDistancePerformanceTableDeleteCommand $distancePerformanceTableDeleteCommand;


    public function __construct(
        private IUserService $userService,
        private IDbService $dbService,
        private IHttpService $httpService
    )
    {
    }


    public function getAircraftController(): IRestController
    {
        if (!isset($this->aircraftController)) {
            $this->aircraftController = new AircraftController(
                $this->getAircraftService(),
                $this->httpService
            );
        }

        return $this->aircraftController;
    }


    public function getAircraftService(): IAircraftService
    {
        if (!isset($this->aircraftService)) {
            $this->aircraftService = new AircraftService(
                $this->userService,
                $this->getAircraftListQuery(),
                $this->getAircraftByIdQuery(),
                $this->getAircraftCreateCommand(),
                $this->getAircraftUpdateCommand()
            );
        }

        return $this->aircraftService;
    }


    public function getAircraftListQuery(): IAircraftListQuery
    {
        if (!isset($this->aircraftListQuery)) {
            $this->aircraftListQuery = new DbAircraftListQuery(
                $this->dbService
            );
        }

        return $this->aircraftListQuery;
    }


    public function getAircraftByIdQuery(): IAircraftByIdQuery
    {
        if (!isset($this->aircraftByIdQuery)) {
            $this->aircraftByIdQuery = new DbAircraftByIdQuery(
                $this->dbService
            );
        }

        return $this->aircraftByIdQuery;
    }


    public function getAircraftCreateCommand(): IAircraftCreateCommand
    {
        if (!isset($this->aircraftCreateCommand)) {
            $this->aircraftCreateCommand = new DbAircraftCreateCommand(
                $this->dbService,
                $this->getDistancePerformanceTableCreateCommand()
            );
        }

        return $this->aircraftCreateCommand;
    }


    public function getAircraftUpdateCommand(): IAircraftUpdateCommand
    {
        if (!isset($this->aircraftUpdateCommand)) {
            $this->aircraftUpdateCommand = new DbAircraftUpdateCommand(
                $this->dbService,
                $this->getDistancePerformanceTableCreateCommand(),
                $this->getDistancePerformanceTableDeleteCommand()
            );
        }

        return $this->aircraftUpdateCommand;
    }


    public function getAircraftDeleteCommand(): IAircraftDeleteCommand
    {
        if (!isset($this->aircraftDeleteCommand)) {
            $this->aircraftDeleteCommand = new DbAircraftDeleteCommand(
                $this->dbService,
                $this->getDistancePerformanceTableDeleteCommand()
            );
        }

        return $this->aircraftDeleteCommand;
    }


    public function getDistancePerformanceTableCreateCommand(): IDistancePerformanceTableCreateCommand
    {
        if (!isset($this->distancePerformanceTableCreateCommand)) {
            $this->distancePerformanceTableCreateCommand = new DbDistancePerformanceTableCreateCommand(
                $this->dbService
            );
        }

        return $this->distancePerformanceTableCreateCommand;
    }


    public function getDistancePerformanceTableDeleteCommand(): IDistancePerformanceTableDeleteCommand
    {
        if (!isset($this->distancePerformanceTableDeleteCommand)) {
            $this->distancePerformanceTableDeleteCommand = new DbDistancePerformanceTableDeleteCommand(
                $this->dbService
            );
        }

        return $this->distancePerformanceTableDeleteCommand;
    }
}
