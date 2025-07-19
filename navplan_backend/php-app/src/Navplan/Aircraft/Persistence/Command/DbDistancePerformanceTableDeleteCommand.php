<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableDeleteCommand;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftPerfDist;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbDistancePerformanceTableDeleteCommand implements IDistancePerformanceTableDeleteCommand
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function deleteByAircraft(int $aircraftId)
    {
        $query = "DELETE FROM " . DbTableAircraftPerfDist::TABLE_NAME;
        $query .= " WHERE " . DbTableAircraftPerfDist::COL_ID_AIRCRAFT . "=" . DbHelper::getDbIntValue($aircraftId);
        $this->dbService->execCUDQuery($query, "error deleting distance performance tables from aircraft");
    }
}
