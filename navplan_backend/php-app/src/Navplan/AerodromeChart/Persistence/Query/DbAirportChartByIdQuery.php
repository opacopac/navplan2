<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Query;

use Navplan\AerodromeChart\Domain\Model\AirportChart;
use Navplan\AerodromeChart\Domain\Query\IAirportChartByIdQuery;
use Navplan\AerodromeChart\Persistence\Model\DbAirportChart2Converter;
use Navplan\AerodromeChart\Persistence\Model\DbTableAirportCharts;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAirportChartByIdQuery implements IAirportChartByIdQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function read(int $id, int $userId): AirportChart
    {
        $query = "SELECT * FROM " . DbTableAirportCharts::TABLE_NAME;
        $query .= " WHERE " . DbTableAirportCharts::COL_ID . "=" . DbHelper::getDbIntValue($id);
        $query .= " AND " . DbTableAirportCharts::COL_ACTIVE . "=1";

        if ($userId > 0) {
            $query .= " AND (" . DbTableAirportCharts::COL_USER_ID . "=" . DbHelper::getDbIntValue($userId);
            $query .= " OR " . DbTableAirportCharts::COL_USER_ID . " IS NULL)";
        } else {
            $query .= " AND " . DbTableAirportCharts::COL_USER_ID . " IS NULL";
        }

        $result = $this->dbService->execSingleResultQuery($query, false, "error reading chart by id");

        return DbAirportChart2Converter::fromDbRow($result->fetch_assoc());
    }
}
