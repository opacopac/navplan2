<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IWeightItemDeleteCommand;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftWeightItems;
use Navplan\System\Db\Domain\Service\IDbService;


readonly class DbWeightItemDeleteCommand implements IWeightItemDeleteCommand
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function deleteByAircraft(int $aircraftId): void
    {
        $t = new DbTableAircraftWeightItems();
        $dcb = $this->dbService->getDeleteCommandBuilder();
        $query = $dcb
            ->deleteFrom($t)
            ->whereEquals($t->colIdAircraft(), $aircraftId)
            ->build();

        $this->dbService->execCUDQuery($query, "error deleting weight items from aircraft");
    }
}
