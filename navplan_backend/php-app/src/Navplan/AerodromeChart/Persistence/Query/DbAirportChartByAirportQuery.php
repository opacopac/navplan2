<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Query;

use Navplan\AerodromeChart\Domain\Query\IAirportChartByAirportQuery;
use Navplan\AerodromeChart\Persistence\Model\DbAirportChart2Converter;
use Navplan\AerodromeChart\Persistence\Model\DbTableAirportCharts;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAirportChartByAirportQuery implements IAirportChartByAirportQuery
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function readList(string $airportIcao, int $userId): array
    {
        $query = "SELECT * FROM " . DbTableAirportCharts::TABLE_NAME;
        $query .= " WHERE " . DbTableAirportCharts::COL_AD_ICAO . "=" . DbHelper::getDbStringValue($this->dbService, $airportIcao);
        //$query .= " AND " . DbTableAirportCharts::COL_ID_USER . "=" . DbHelper::getDbIntValue($userId);

        $result = $this->dbService->execMultiResultQuery($query, "error reading airport chart list");

        return DbAirportChart2Converter::fromDbResult($result);
    }
}
