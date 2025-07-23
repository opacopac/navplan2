<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Command;

use Navplan\AerodromeReporting\Domain\Command\IAerodromeReportingDeleteCommand;
use Navplan\AerodromeReporting\Persistence\Model\DbTableReportingPoints;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbAerodromeReportingDeleteCommand implements IAerodromeReportingDeleteCommand
{
    public function __construct(
        private readonly IDbService $dbService,
    )
    {
    }


    public function delete(int $reportingPointId, int $userId): void
    {
        $t = new DbTableReportingPoints();
        $query = $this->dbService->getDeleteCommandBuilder()
            ->deleteFrom($t)
            ->whereEquals($t->colId(), DbHelper::getDbIntValue($reportingPointId))
            ->build();

        $this->dbService->execCUDQuery($query, "error deleting reporting point");
    }
}
