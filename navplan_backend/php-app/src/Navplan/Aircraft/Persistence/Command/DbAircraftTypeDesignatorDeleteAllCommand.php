<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IAircraftTypeDesignatorDeleteAllCommand;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftTypeDesignator;
use Navplan\System\Db\Domain\Service\IDbService;


readonly class DbAircraftTypeDesignatorDeleteAllCommand implements IAircraftTypeDesignatorDeleteAllCommand
{
    public function __construct(
        private IDbService $dbService,
    )
    {
    }


    public function deleteAll(): void
    {
        $t = new DbTableAircraftTypeDesignator();
        $dcb = $this->dbService->getDeleteCommandBuilder();
        $query = $dcb
            ->deleteFrom($t)
            ->build();

        $this->dbService->execCUDQuery($query, "error deleting all aircraft type desinators");
    }
}
