<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IWeightItemCreateCommand;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftWeightItems;
use Navplan\Aircraft\Persistence\Model\DbWeightItemConverter;
use Navplan\System\Db\Domain\Service\IDbService;


readonly class DbWeightItemCreateCommand implements IWeightItemCreateCommand
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function create(int $aircraftId, array $weightItems): void
    {
        $t = new DbTableAircraftWeightItems();
        $icb = $this->dbService->getInsertCommandBuilder()->insertInto($t);
        $converter = new DbWeightItemConverter($t);

        foreach ($weightItems as $weightItem) {
            $converter->bindInsertValues($aircraftId, $weightItem, $icb);
            $statement = $icb->buildAndBindStatement();
            $statement->execute("error inserting weight item");
        }
    }
}
