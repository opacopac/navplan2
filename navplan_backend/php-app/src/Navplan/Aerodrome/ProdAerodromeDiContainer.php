<?php declare(strict_types=1);

namespace Navplan\Aerodrome;

use Navplan\Aerodrome\Domain\Command\IAirportCreateAllCommand;
use Navplan\Aerodrome\Domain\Command\IAirportDeleteAllCommand;
use Navplan\Aerodrome\Domain\Query\IAirportByExtentQuery;
use Navplan\Aerodrome\Domain\Query\IAirportByIcaoQuery;
use Navplan\Aerodrome\Domain\Query\IAirportByIdQuery;
use Navplan\Aerodrome\Domain\Query\IAirportByPositionQuery;
use Navplan\Aerodrome\Domain\Query\IAirportByTextQuery;
use Navplan\Aerodrome\Domain\Query\IAirportFeatureQuery;
use Navplan\Aerodrome\Domain\Query\IAirportRadioQuery;
use Navplan\Aerodrome\Domain\Query\IAirportRunwayQuery;
use Navplan\Aerodrome\Domain\Service\AirportService;
use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Aerodrome\Persistence\Command\DbAirportCreateAllCommand;
use Navplan\Aerodrome\Persistence\Command\DbAirportDeleteAllCommand;
use Navplan\Aerodrome\Persistence\Query\DbAirportByExtentQuery;
use Navplan\Aerodrome\Persistence\Query\DbAirportByIcaoQuery;
use Navplan\Aerodrome\Persistence\Query\DbAirportByIdQuery;
use Navplan\Aerodrome\Persistence\Query\DbAirportByPositionQuery;
use Navplan\Aerodrome\Persistence\Query\DbAirportByTextQuery;
use Navplan\Aerodrome\Persistence\Query\DbAirportFeatureQuery;
use Navplan\Aerodrome\Persistence\Query\DbAirportRadioQuery;
use Navplan\Aerodrome\Persistence\Query\DbAirportRunwayQuery;
use Navplan\Aerodrome\Rest\Controller\AirportController;
use Navplan\AerodromeChart\Domain\Service\IAirportChartService;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\Webcam\Domain\Query\IWebcamByIcaoQuery;


class ProdAerodromeDiContainer implements IAerodromeDiContainer
{
    private IRestController $airportController;
    private IAirportService $airportService;
    private IAirportByIdQuery $airportByIdQuery;
    private IAirportByIcaoQuery $airportByIcaoQuery;
    private IAirportByExtentQuery $airportByExtentQuery;
    private IAirportByPositionQuery $airportByPositionQuery;
    private IAirportByTextQuery $airportByTextQuery;
    private IAirportRunwayQuery $airportRunwayQuery;
    private IAirportRadioQuery $airportRadioQuery;
    private IAirportFeatureQuery $airportFeatureQuery;
    private IAirportCreateAllCommand $airportCreateAllCommand;
    private IAirportDeleteAllCommand $airportDeleteAllCommand;


    public function __construct(
        private IDbService $dbService,
        private ILoggingService $loggingService,
        private IHttpService $httpService,
        private IAirportChartService $airportChartService,
        private IWebcamByIcaoQuery $webcamByIcaoQuery,
    )
    {
    }


    public function getAirportController(): IRestController
    {
        if (!isset($this->airportController)) {
            $this->airportController = new AirportController(
                $this->httpService,
                $this->getAirportService()
            );
        }

        return $this->airportController;
    }


    public function getAirportService(): IAirportService
    {
        if (!isset($this->airportService)) {
            $this->airportService = new AirportService(
                $this->getAirportByIdQuery(),
                $this->getAirportByIcaoQuery(),
                $this->getAirportByExtentQuery(),
                $this->getAirportByPositionQuery(),
                $this->getAirportByTextQuery(),
                $this->getAirportRunwayQuery(),
                $this->getAirportRadioQuery(),
                $this->getairportFeatureQuery(),
                $this->getAirportCreateAllCommand(),
                $this->getAirportDeleteAllCommand(),
                $this->airportChartService,
                $this->webcamByIcaoQuery,
            );
        }

        return $this->airportService;
    }


    private function getAirportByIdQuery(): IAirportByIdQuery
    {
        if (!isset($this->airportByIdQuery)) {
            $this->airportByIdQuery = new DbAirportByIdQuery($this->dbService);
        }

        return $this->airportByIdQuery;
    }


    private function getAirportByIcaoQuery(): IAirportByIcaoQuery
    {
        if (!isset($this->airportByIcaoQuery)) {
            $this->airportByIcaoQuery = new DbAirportByIcaoQuery($this->dbService);
        }

        return $this->airportByIcaoQuery;
    }


    private function getAirportByExtentQuery(): IAirportByExtentQuery
    {
        if (!isset($this->airportByExtentQuery)) {
            $this->airportByExtentQuery = new DbAirportByExtentQuery($this->dbService);
        }

        return $this->airportByExtentQuery;
    }


    private function getAirportByPositionQuery(): IAirportByPositionQuery
    {
        if (!isset($this->airportByPositionQuery)) {
            $this->airportByPositionQuery = new DbAirportByPositionQuery($this->dbService);
        }

        return $this->airportByPositionQuery;
    }


    private function getAirportByTextQuery(): IAirportByTextQuery
    {
        if (!isset($this->airportByTextQuery)) {
            $this->airportByTextQuery = new DbAirportByTextQuery($this->dbService);
        }

        return $this->airportByTextQuery;
    }


    private function getAirportRunwayQuery(): IAirportRunwayQuery
    {
        if (!isset($this->airportRunwayQuery)) {
            $this->airportRunwayQuery = new DbAirportRunwayQuery($this->dbService);
        }

        return $this->airportRunwayQuery;
    }


    private function getAirportRadioQuery(): IAirportRadioQuery
    {
        if (!isset($this->airportRadioQuery)) {
            $this->airportRadioQuery = new DbAirportRadioQuery($this->dbService);
        }

        return $this->airportRadioQuery;
    }


    private function getAirportFeatureQuery(): IAirportFeatureQuery
    {
        if (!isset($this->airportFeatureQuery)) {
            $this->airportFeatureQuery = new DbAirportFeatureQuery($this->dbService);
        }

        return $this->airportFeatureQuery;
    }


    public function getAirportCreateAllCommand(): IAirportCreateAllCommand
    {
        if (!isset($this->airportCreateAllCommand)) {
            $this->airportCreateAllCommand = new DbAirportCreateAllCommand(
                $this->dbService,
                $this->loggingService
            );
        }

        return $this->airportCreateAllCommand;
    }


    public function getAirportDeleteAllCommand(): IAirportDeleteAllCommand
    {
        if (!isset($this->airportDeleteAllCommand)) {
            $this->airportDeleteAllCommand = new DbAirportDeleteAllCommand(
                $this->dbService,
                $this->loggingService
            );
        }

        return $this->airportDeleteAllCommand;
    }
}
