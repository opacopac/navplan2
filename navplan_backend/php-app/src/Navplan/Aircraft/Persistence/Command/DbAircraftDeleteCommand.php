<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IAircraftDeleteCommand;
use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableDeleteCommand;
use Navplan\Aircraft\Persistence\Model\DbTableAircraft;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAircraftDeleteCommand implements IAircraftDeleteCommand
{
    public function __construct(
        private IDbService $dbService,
        private IDistancePerformanceTableDeleteCommand $distancePerformanceTableDeleteCommand
    )
    {
    }


    public function delete(int $aircraftId, int $userId)
    {
        $this->distancePerformanceTableDeleteCommand->deleteByAircraft($aircraftId);

        $query = "DELETE FROM " . DbTableAircraft::TABLE_NAME;
        $query .= " WHERE " . DbTableAircraft::COL_ID . "=" . DbHelper::getDbIntValue($aircraftId);
        $query .= " AND " . DbTableAircraft::COL_ID_USER . "=" . DbHelper::getDbIntValue($userId);
        $this->dbService->execCUDQuery($query, "error deleting aircraft");
    }
}
