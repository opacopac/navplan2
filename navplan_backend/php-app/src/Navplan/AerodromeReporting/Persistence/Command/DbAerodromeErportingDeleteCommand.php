<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Command;

use Navplan\AerodromeReporting\Domain\Command\IAerodromeReportingDeleteCommand;
use Navplan\AerodromeReporting\Persistence\Model\DbTableReportingPoints;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAerodromeErportingDeleteCommand implements IAerodromeReportingDeleteCommand
{
    public function __construct(
        private readonly IDbService $dbService,
    )
    {
    }


    public function delete(int $reportingPointId, int $userId)
    {
        $query = "DELETE FROM " . DbTableReportingPoints::TABLE_NAME;
        $query .= " WHERE " . DbTableReportingPoints::COL_ID . "=" . DbHelper::getDbIntValue($reportingPointId);
        //$query .= " AND " . DbTableReportingPoints::COL_USER_ID . "=" . DbHelper::getDbIntValue($userId);
        $this->dbService->execCUDQuery($query, "error deleting reporting point");
    }
}
