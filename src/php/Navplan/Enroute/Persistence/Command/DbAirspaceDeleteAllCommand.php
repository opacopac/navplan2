<?php declare(strict_types=1);

namespace Navplan\Enroute\Persistence\Command;

use Navplan\Enroute\Domain\Command\IAirspaceDeleteAllCommand;
use Navplan\Enroute\Persistence\Model\DbTableAirspace;
use Navplan\System\DomainService\IDbService;
use Navplan\System\DomainService\ILoggingService;


class DbAirspaceDeleteAllCommand implements IAirspaceDeleteAllCommand {
    public function __construct(
        private IDbService $dbService,
        private ILoggingService $loggingService
    ) {
    }


    public function deleteAll(): bool {
        $query = "TRUNCATE TABLE " . DbTableAirspace::TABLE_NAME;

        return $this->dbService->execCUDQuery($query);
    }
}
