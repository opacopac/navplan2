<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IWeightItemDeleteCommand;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftWeightItems;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbWeightItemDeleteCommand implements IWeightItemDeleteCommand
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function deleteByAircraft(int $aircraftId): void
    {
        $query = "DELETE FROM " . DbTableAircraftWeightItems::TABLE_NAME;
        $query .= " WHERE " . DbTableAircraftWeightItems::COL_ID_AIRCRAFT . "=" . DbHelper::getDbIntValue($aircraftId);
        $this->dbService->execCUDQuery($query, "error deleting weight items from aircraft");
    }
}
