<?php declare(strict_types=1);

namespace Navplan\Enroute\Persistence\Command;

use Navplan\Enroute\Domain\Command\INavaidDeleteAllCommand;
use Navplan\Enroute\Persistence\Model\DbTableNavaid;
use Navplan\System\Domain\Service\IDbService;


class DbNavaidDeleteAllCommand implements INavaidDeleteAllCommand {
    public function __construct(
        private IDbService $dbService
    ) {
    }


    public function deleteAll(): bool {
        $query = "TRUNCATE TABLE " . DbTableNavaid::TABLE_NAME;

        return $this->dbService->execCUDQuery($query);
    }
}
