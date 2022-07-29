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
use Navplan\Aerodrome\Rest\Controller\AirportController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\DomainService\IDbService;
use Navplan\System\DomainService\IHttpService;
use Navplan\System\DomainService\ILoggingService;


class ProdAerodromeDiContainer implements IAerodromeDiContainer
{
    private IRestController $airportController;
    private IAirportService $airportService;
    private IAirportChartService $airportChartService;
    private IAirportCircuitService $airportCircuitService;
    private IReportingPointService $reportingPointService;


    public function __construct(
        private IDbService $dbService,
        private ILoggingService $loggingService,
        private IHttpService $httpService
    ) {
    }


    public function getAirportController(): IRestController {
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


    public function getAirportService(): IAirportService {
        if (!isset($this->airportService)) {
            $this->airportService = new DbAirportRepo(
                $this->dbService,
                $this->loggingService
            );
        }

        return $this->airportService;
    }


    function getAirportChartService(): IAirportChartService {
        if (!isset($this->airportChartService)) {
            $this->airportChartService = new DbAirportChartRepo($this->dbService);
        }

        return $this->airportChartService;
    }


    function getAirportCircuitService(): IAirportCircuitService {
        if (!isset($this->airportCircuitService)) {
            $this->airportCircuitService = new DbAirportCircuitRepo($this->dbService);
        }

        return $this->airportCircuitService;
    }


    public function getReportingPointService(): IReportingPointService {
        if (!isset($this->reportingPointService)) {
            $this->reportingPointService = new DbReportingPointRepo($this->dbService);
        }

        return $this->reportingPointService;
    }
}
