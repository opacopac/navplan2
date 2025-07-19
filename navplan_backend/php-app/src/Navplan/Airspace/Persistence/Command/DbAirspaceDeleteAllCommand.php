<?php declare(strict_types=1);

namespace Navplan\Airspace\Persistence\Command;

use Navplan\Airspace\Domain\Command\IAirspaceDeleteAllCommand;
use Navplan\Airspace\Persistence\Model\DbTableAirspace;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ILoggingService;


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
