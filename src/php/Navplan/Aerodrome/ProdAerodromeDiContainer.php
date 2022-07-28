<?php declare(strict_types=1);

namespace Navplan\Aerodrome;

use Navplan\Aerodrome\DbRepo\DbAirportChartRepo;
use Navplan\Aerodrome\DbRepo\DbAirportCircuitRepo;
use Navplan\Aerodrome\DbRepo\DbAirportRepo;
use Navplan\Aerodrome\DbRepo\DbReportingPointRepo;
use Navplan\Aerodrome\DomainService\IAirportChartService;
use Navplan\Aerodrome\DomainService\IAirportCircuitService;
use Navplan\Aerodrome\DomainService\IAirportService;
use Navplan\Aerodrome\DomainService\IReportingPointService;
use Navplan\System\DomainService\IDbService;
use Navplan\System\DomainService\ILoggingService;


class ProdAerodromeDiContainer implements IAerodromeDiContainer
{
    private IAirportService $airportService;
    private IAirportChartService $airportChartService;
    private IAirportCircuitService $airportCircuitService;
    private IReportingPointService $reportingPointService;


    public function __construct(
        private IDbService $dbService,
        private ILoggingService $loggingService
    ) {
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
