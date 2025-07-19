<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IAircraftTypeDesignatorDeleteAllCommand;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftTypeDesignator;
use Navplan\System\Db\Domain\Service\IDbService;


class DbAircraftTypeDesignatorDeleteAllCommand implements IAircraftTypeDesignatorDeleteAllCommand
{
    public function __construct(
        private IDbService $dbService,
    )
    {
    }


    public function deleteAll()
    {
        $query = "DELETE FROM " . DbTableAircraftTypeDesignator::TABLE_NAME;
        $this->dbService->execCUDQuery($query, "error deleting all aircraft type desinators");
    }
}
