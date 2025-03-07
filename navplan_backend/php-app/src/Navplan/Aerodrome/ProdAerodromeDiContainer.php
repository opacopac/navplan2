<?php declare(strict_types=1);

namespace Navplan\Aerodrome;

use Navplan\Aerodrome\Domain\Service\IAirportChartService;
use Navplan\Aerodrome\Domain\Service\IAirportCircuitService;
use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Aerodrome\Domain\Service\IReportingPointService;
use Navplan\Aerodrome\Persistence\Repo\DbAirportChartRepo;
use Navplan\Aerodrome\Persistence\Repo\DbAirportCircuitRepo;
use Navplan\Aerodrome\Persistence\Repo\DbAirportRepo;
use Navplan\Aerodrome\Persistence\Repo\DbReportingPointRepo;
use Navplan\Aerodrome\Rest\Controller\AdChartController;
use Navplan\Aerodrome\Rest\Controller\AdCircuitController;
use Navplan\Aerodrome\Rest\Controller\AdReportingPointController;
use Navplan\Aerodrome\Rest\Controller\AirportController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\ILoggingService;


class ProdAerodromeDiContainer implements IAerodromeDiContainer
{
    private IRestController $airportController;
    private IRestController $airportCircuitController;
    private IRestController $reportingPointController;
    private IRestController $airportChartController;
    private IAirportService $airportService;
    private IAirportChartService $airportChartService;
    private IAirportCircuitService $airportCircuitService;
    private IReportingPointService $reportingPointService;


    public function __construct(
        private IDbService      $dbService,
        private ILoggingService $loggingService,
        private IHttpService    $httpService
    )
    {
    }


    public function getAirportController(): IRestController
    {
        if (!isset($this->airportController)) {
            $this->airportController = new AirportController(
                $this->httpService,
                $this->getAirportService(),
                $this->getAirportCircuitService(),
                $this->getAirportChartService(),
                $this->getReportingPointService()
            );
        }

        return $this->airportController;
    }


    public function getAirportCircuitController(): IRestController
    {
        if (!isset($this->airportCircuitController)) {
            $this->airportCircuitController = new AdCircuitController(
                $this->httpService,
                $this->getAirportCircuitService()
            );
        }

        return $this->airportCircuitController;
    }


    public function getReportingPointController(): IRestController
    {
        if (!isset($this->reportingPointController)) {
            $this->reportingPointController = new AdReportingPointController(
                $this->httpService,
                $this->getReportingPointService()
            );
        }

        return $this->reportingPointController;
    }


    public function getAirportChartController(): IRestController
    {
        if (!isset($this->airportChartController)) {
            $this->airportChartController = new AdChartController(
                $this->httpService,
                $this->getAirportChartService()
            );
        }

        return $this->airportChartController;
    }


    public function getAirportService(): IAirportService
    {
        if (!isset($this->airportService)) {
            $this->airportService = new DbAirportRepo(
                $this->dbService,
                $this->loggingService
            );
        }

        return $this->airportService;
    }


    function getAirportChartService(): IAirportChartService
    {
        if (!isset($this->airportChartService)) {
            $this->airportChartService = new DbAirportChartRepo($this->dbService);
        }

        return $this->airportChartService;
    }


    function getAirportCircuitService(): IAirportCircuitService
    {
        if (!isset($this->airportCircuitService)) {
            $this->airportCircuitService = new DbAirportCircuitRepo($this->dbService);
        }

        return $this->airportCircuitService;
    }


    public function getReportingPointService(): IReportingPointService
    {
        if (!isset($this->reportingPointService)) {
            $this->reportingPointService = new DbReportingPointRepo($this->dbService);
        }

        return $this->reportingPointService;
    }
}
