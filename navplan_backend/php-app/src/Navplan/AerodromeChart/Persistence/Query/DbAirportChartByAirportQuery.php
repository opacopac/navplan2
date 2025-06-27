<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Query;

use Navplan\AerodromeChart\Domain\Model\AirportChart;
use Navplan\AerodromeChart\Domain\Query\IAirportChartByAirportQuery;
use Navplan\AerodromeChart\Persistence\Model\DbAirportChart2Converter;
use Navplan\AerodromeChart\Persistence\Model\DbTableAirportCharts;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAirportChartByAirportQuery implements IAirportChartByAirportQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    /**
     * @param string $airportIcao
     * @param int $userId
     * @return AirportChart[]
     */
    public function readList(string $airportIcao, int $userId): array
    {
        $query = " SELECT * FROM " . DbTableAirportCharts::TABLE_NAME;
        $query .= "  (CASE ";
        $query .= "    WHEN " . DbTableAirportCharts::COL_NAME . " LIKE 'AREA%' THEN 1";
        $query .= "    WHEN " . DbTableAirportCharts::COL_NAME . " LIKE 'VAC%' THEN 2";
        $query .= "    WHEN " . DbTableAirportCharts::COL_NAME . " LIKE 'AD INFO%' THEN 3";
        $query .= "    ELSE 4";
        $query .= "  END) AS sortorder1";
        $query .= " WHERE " . DbTableAirportCharts::COL_AD_ICAO . "=" . DbHelper::getDbStringValue($this->dbService, $airportIcao);
        $query .= " AND " . DbTableAirportCharts::COL_ACTIVE . "=1";

        if ($userId > 0) {
            $query .= " AND (" . DbTableAirportCharts::COL_USER_ID . "=" . DbHelper::getDbIntValue($userId);
            $query .= " OR " . DbTableAirportCharts::COL_USER_ID . " IS NULL)";
        } else {
            $query .= " AND " . DbTableAirportCharts::COL_USER_ID . " IS NULL";
        }

        $query .= " ORDER BY";
        $query .= "   " . DbTableAirportCharts::COL_SOURCE . " ASC,";
        $query .= "   sortorder1 ASC,";
        $query .= "   " . DbTableAirportCharts::COL_NAME . " ASC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading airport chart list");

        return DbAirportChart2Converter::fromDbResult($result);
    }
}
