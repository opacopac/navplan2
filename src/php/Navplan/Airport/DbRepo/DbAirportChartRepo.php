<?php declare(strict_types=1);

namespace Navplan\Airport\DbRepo;

use Navplan\Airport\DbModel\DbAirportChartConverter;
use Navplan\Airport\DomainModel\AirportChart;
use Navplan\Airport\DomainService\IAirportChartRepo;
use Navplan\System\DomainService\IDbService;


class DbAirportChartRepo implements IAirportChartRepo {
    public function __construct(private IDbService $dbService) {
    }


    public function getAdChartsByIcao(string $adIcao): array {
        $query = "SELECT * FROM ad_charts WHERE airport_icao=" . $this->dbService->escapeAndQuoteString($adIcao);

        $result = $this->dbService->execMultiResultQuery($query, "error reading AD charts by icao");

        $charts = [];
        while ($row = $result->fetch_assoc()) {
            $charts[] = DbAirportChartConverter::fromDbRow($row);
        }

        return $charts;
    }


    public function getAdChartById(int $id): AirportChart {
        $query = "SELECT * FROM ad_charts WHERE id=" . $id;

        $result = $this->dbService->execSingleResultQuery($query, false, "error reading AD chart by id");

        $row = $result->fetch_assoc();
        return DbAirportChartConverter::fromDbRow($row);
    }
}