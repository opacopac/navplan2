<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableDeleteCommand;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftPerfDist;
use Navplan\System\Db\Domain\Service\IDbService;


readonly class DbDistancePerformanceTableDeleteCommand implements IDistancePerformanceTableDeleteCommand
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function deleteByAircraft(int $aircraftId): void
    {
        $t = new DbTableAircraftPerfDist();
        $dcb = $this->dbService->getDeleteCommandBuilder();
        $query = $dcb
            ->deleteFrom($t)
            ->whereEquals($t->colIdAircraft(), $aircraftId)
            ->build();

        $this->dbService->execCUDQuery($query, "error deleting distance performance tables from aircraft");
    }
}
