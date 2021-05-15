<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DbRepo;

use Navplan\Aerodrome\DbModel\DbAirportChartConverter;
use Navplan\Aerodrome\DomainModel\AirportChart;
use Navplan\Aerodrome\DomainService\IAirportChartRepo;
use Navplan\System\DomainService\IDbService;


class DbAirportChartRepo implements IAirportChartRepo {
    public function __construct(private IDbService $dbService) {
    }


    public function getAdChartsByIcao(string $adIcao): array {
        $query = "SELECT *,";
        $query .= "  (CASE WHEN type LIKE 'AREA%' THEN 1 WHEN type LIKE 'VAC%' THEN 2 WHEN type LIKE 'AD INFO%' THEN 3 ELSE 4 END) AS sortorder1";
        $query .= " FROM ad_charts ";
        $query .= " WHERE airport_icao = " .  $this->dbService->escapeAndQuoteString($adIcao) . ")";
        $query .= " ORDER BY";
        $query .= "   source ASC,";
        $query .= "   sortorder1 ASC,";
        $query .= "   type ASC";

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
