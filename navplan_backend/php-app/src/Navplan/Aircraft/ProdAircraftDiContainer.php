<?php declare(strict_types=1);

namespace Navplan\Aircraft;

use Navplan\Aircraft\Domain\Command\IAircraftCreateCommand;
use Navplan\Aircraft\Domain\Command\IAircraftDeleteCommand;
use Navplan\Aircraft\Domain\Command\IAircraftTypeDesignatorCreateCommand;
use Navplan\Aircraft\Domain\Command\IAircraftTypeDesignatorDeleteAllCommand;
use Navplan\Aircraft\Domain\Command\IAircraftUpdateCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableCreateCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableDeleteCommand;
use Navplan\Aircraft\Domain\Command\IWeightItemCreateCommand;
use Navplan\Aircraft\Domain\Command\IWeightItemDeleteCommand;
use Navplan\Aircraft\Domain\Command\IWnbEnvelopeCreateCommand;
use Navplan\Aircraft\Domain\Command\IWnbEnvelopeDeleteCommand;
use Navplan\Aircraft\Domain\Query\IAircraftByIdQuery;
use Navplan\Aircraft\Domain\Query\IAircraftListQuery;
use Navplan\Aircraft\Domain\Service\AircraftService;
use Navplan\Aircraft\Domain\Service\AircraftTypeDesignatorService;
use Navplan\Aircraft\Domain\Service\IAircraftService;
use Navplan\Aircraft\Domain\Service\IAircraftTypeDesignatorService;
use Navplan\Aircraft\Importer\Service\AircraftTypeDesignatorImporter;
use Navplan\Aircraft\Importer\Service\IAircraftTypeDesignatorImporter;
use Navplan\Aircraft\Persistence\Command\DbAircraftCreateCommand;
use Navplan\Aircraft\Persistence\Command\DbAircraftDeleteCommand;
use Navplan\Aircraft\Persistence\Command\DbAircraftTypeDesignatorCreateCommand;
use Navplan\Aircraft\Persistence\Command\DbAircraftTypeDesignatorDeleteAllCommand;
use Navplan\Aircraft\Persistence\Command\DbAircraftUpdateCommand;
use Navplan\Aircraft\Persistence\Command\DbDistancePerformanceTableCreateCommand;
use Navplan\Aircraft\Persistence\Command\DbDistancePerformanceTableDeleteCommand;
use Navplan\Aircraft\Persistence\Command\DbWeightItemCreateCommand;
use Navplan\Aircraft\Persistence\Command\DbWeightItemDeleteCommand;
use Navplan\Aircraft\Persistence\Command\DbWnbEnvelopeCreateCommand;
use Navplan\Aircraft\Persistence\Command\DbWnbEnvelopeDeleteCommand;
use Navplan\Aircraft\Persistence\Query\DbAircraftByIdQuery;
use Navplan\Aircraft\Persistence\Query\DbAircraftListQuery;
use Navplan\Aircraft\Rest\Controller\AircraftController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\ILoggingService;
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
    private IWeightItemCreateCommand $weightItemCreateCommand;
    private IWeightItemDeleteCommand $weightItemDeleteCommand;
    private IWnbEnvelopeCreateCommand $wnbEnvelopeCreateCommand;
    private IWnbEnvelopeDeleteCommand $wnbEnvelopeDeleteCommand;
    private IDistancePerformanceTableCreateCommand $distancePerformanceTableCreateCommand;
    private IDistancePerformanceTableDeleteCommand $distancePerformanceTableDeleteCommand;
    private IAircraftTypeDesignatorService $acTypeDesignatorService;
    private IAircraftTypeDesignatorCreateCommand $acTypeDesignatorCreateCommand;
    private IAircraftTypeDesignatorDeleteAllCommand $acTypeDesignatorDeleteAllCommand;
    private IAircraftTypeDesignatorImporter $acTypeDesignationImporter;


    public function __construct(
        private IUserService $userService,
        private IDbService $dbService,
        private IHttpService $httpService,
        private ILoggingService $loggingService
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
                $this->getAircraftUpdateCommand(),
                $this->getAircraftDeleteCommand()
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
                $this->getWeightItemCreateCommand(),
                $this->getWnbEnvelopeCreateCommand(),
                $this->getDistancePerformanceTableCreateCommand(),
            );
        }

        return $this->aircraftCreateCommand;
    }


    public function getAircraftUpdateCommand(): IAircraftUpdateCommand
    {
        if (!isset($this->aircraftUpdateCommand)) {
            $this->aircraftUpdateCommand = new DbAircraftUpdateCommand(
                $this->dbService,
                $this->getWeightItemCreateCommand(),
                $this->getWeightItemDeleteCommand(),
                $this->getWnbEnvelopeCreateCommand(),
                $this->getWnbEnvelopeDeleteCommand(),
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
                $this->getWeightItemDeleteCommand(),
                $this->getWnbEnvelopeDeleteCommand(),
                $this->getDistancePerformanceTableDeleteCommand()
            );
        }

        return $this->aircraftDeleteCommand;
    }


    public function getWeightItemCreateCommand(): IWeightItemCreateCommand
    {
        if (!isset($this->weightItemCreateCommand)) {
            $this->weightItemCreateCommand = new DbWeightItemCreateCommand(
                $this->dbService
            );
        }

        return $this->weightItemCreateCommand;
    }


    public function getWeightItemDeleteCommand(): IWeightItemDeleteCommand
    {
        if (!isset($this->weightItemDeleteCommand)) {
            $this->weightItemDeleteCommand = new DbWeightItemDeleteCommand(
                $this->dbService
            );
        }

        return $this->weightItemDeleteCommand;
    }


    public function getWnbEnvelopeCreateCommand(): IWnbEnvelopeCreateCommand
    {
        if (!isset($this->wnbEnvelopeCreateCommand)) {
            $this->wnbEnvelopeCreateCommand = new DbWnbEnvelopeCreateCommand(
                $this->dbService
            );
        }

        return $this->wnbEnvelopeCreateCommand;
    }


    public function getWnbEnvelopeDeleteCommand(): IWnbEnvelopeDeleteCommand
    {
        if (!isset($this->wnbEnvelopeDeleteCommand)) {
            $this->wnbEnvelopeDeleteCommand = new DbWnbEnvelopeDeleteCommand(
                $this->dbService
            );
        }

        return $this->wnbEnvelopeDeleteCommand;
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


    public function getAircraftTypeDesignatorService(): IAircraftTypeDesignatorService
    {
        if (!isset($this->acTypeDesignatorService)) {
            $this->acTypeDesignatorService = new AircraftTypeDesignatorService(
                $this->getAircraftTypeDesignatorCreateCommand(),
                $this->getAircraftTypeDesignatorDeleteAllCommand()
            );
        }

        return $this->acTypeDesignatorService;
    }

    public function getAircraftTypeDesignatorCreateCommand(): IAircraftTypeDesignatorCreateCommand
    {
        if (!isset($this->acTypeDesignatorCreateCommand)) {
            $this->acTypeDesignatorCreateCommand = new DbAircraftTypeDesignatorCreateCommand(
                $this->dbService
            );
        }

        return $this->acTypeDesignatorCreateCommand;
    }

    public function getAircraftTypeDesignatorDeleteAllCommand(): IAircraftTypeDesignatorDeleteAllCommand
    {
        if (!isset($this->acTypeDesignatorDeleteAllCommand)) {
            $this->acTypeDesignatorDeleteAllCommand = new DbAircraftTypeDesignatorDeleteAllCommand(
                $this->dbService
            );
        }

        return $this->acTypeDesignatorDeleteAllCommand;
    }


    public function getAircraftTypeDesignatorImporter(): IAircraftTypeDesignatorImporter
    {
        if (!isset($this->acTypeDesignationImporter)) {
            $this->acTypeDesignationImporter = new AircraftTypeDesignatorImporter(
                $this->getAircraftTypeDesignatorService(),
                $this->loggingService
            );
        }

        return $this->acTypeDesignationImporter;
    }
}
