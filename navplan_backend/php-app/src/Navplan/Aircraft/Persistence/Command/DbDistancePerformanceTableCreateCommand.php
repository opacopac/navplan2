<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IDistancePerformanceTableCreateCommand;
use Navplan\Aircraft\Domain\Model\DistancePerformanceTable;
use Navplan\Aircraft\Persistence\Model\DbDistancePerformanceTableConverter;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftPerfDist;
use Navplan\Aircraft\Persistence\Model\PerfDistTableType;
use Navplan\System\Db\Domain\Service\IDbService;


readonly class DbDistancePerformanceTableCreateCommand implements IDistancePerformanceTableCreateCommand
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function create(int $aircraftId, PerfDistTableType $tableType, DistancePerformanceTable $perfTable): void
    {
        $t = new DbTableAircraftPerfDist();
        $icb = $this->dbService->getInsertCommandBuilder()->insertInto($t);
        $converter = new DbDistancePerformanceTableConverter($t);
        $converter->bindInsertValues($perfTable, $aircraftId, $tableType, $icb);

        $statement = $icb->buildAndBindStatement();
        $statement->execute("error inserting distance performance table");
    }
}
