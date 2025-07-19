<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Command;

use Navplan\AerodromeChart\Domain\Command\IAirportChartDeleteCommand;
use Navplan\AerodromeChart\Persistence\Model\DbTableAirportCharts;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbAirportChartDeleteCommand implements IAirportChartDeleteCommand
{
    public function __construct(
        private IDbService $dbService,
    )
    {
    }


    public function delete(int $airportChartId, int $userId)
    {
        $query = "DELETE FROM " . DbTableAirportCharts::TABLE_NAME;
        $query .= " WHERE " . DbTableAirportCharts::COL_ID . "=" . DbHelper::getDbIntValue($airportChartId);
        $query .= " AND " . DbTableAirportCharts::COL_USER_ID . "=" . DbHelper::getDbIntValue($userId);
        $this->dbService->execCUDQuery($query, "error deleting airport chart");
    }
}
