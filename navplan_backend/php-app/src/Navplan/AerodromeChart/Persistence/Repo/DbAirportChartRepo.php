<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Repo;

use Navplan\AerodromeChart\Domain\Model\AirportChart;
use Navplan\AerodromeChart\Domain\Model\AirportChart2;
use Navplan\AerodromeChart\Domain\Service\IAirportChartRepo;
use Navplan\AerodromeChart\Persistence\Model\DbAirportChart2Converter;
use Navplan\AerodromeChart\Persistence\Model\DbAirportChartConverter;
use Navplan\System\Domain\Service\IDbService;


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

        return DbAirportChartConverter::fromDbResult($result);
    }


    public function getAdChartById(int $id): AirportChart {
        $query = "SELECT * FROM ad_charts WHERE id=" . $id;

        $result = $this->dbService->execSingleResultQuery($query, false, "error reading AD chart by id");

        $row = $result->fetch_assoc();
        return DbAirportChartConverter::fromDbRow($row);
    }


    public function getAdCharts2ByIcao(string $adIcao): array {
        $query = "SELECT *,";
        $query .= "  (CASE WHEN type LIKE 'AREA%' THEN 1 WHEN type LIKE 'VAC%' THEN 2 WHEN type LIKE 'AD INFO%' THEN 3 ELSE 4 END) AS sortorder1";
        $query .= " FROM ad_charts2 ";
        $query .= " WHERE ad_icao = " .  $this->dbService->escapeAndQuoteString($adIcao) . ")";
        $query .= " ORDER BY";
        $query .= "   source ASC,";
        $query .= "   sortorder1 ASC,";
        $query .= "   type ASC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading AD charts by icao");

        return DbAirportChart2Converter::fromDbResult($result);
    }


    public function getAdChart2ById(int $id): AirportChart2 {
        $query = "SELECT * FROM ad_charts2 WHERE id=" . $id;

        $result = $this->dbService->execSingleResultQuery($query, false, "error reading AD chart by id");

        $row = $result->fetch_assoc();
        return DbAirportChart2Converter::fromDbRow($row);
    }
}
