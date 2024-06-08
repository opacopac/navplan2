<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Command;

use Navplan\Navaid\Domain\Command\INavaidDeleteAllCommand;
use Navplan\Navaid\Persistence\Model\DbTableNavaid;
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
