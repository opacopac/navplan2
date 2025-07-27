<?php declare(strict_types=1);

namespace Navplan\Airspace\Persistence\Command;

use Navplan\Airspace\Domain\Command\IAirspaceDeleteAllCommand;
use Navplan\Airspace\Persistence\Model\DbTableAirspace;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ILoggingService;


class DbAirspaceDeleteAllCommand implements IAirspaceDeleteAllCommand
{
    public function __construct(
        private readonly IDbService $dbService,
        private readonly ILoggingService $loggingService
    )
    {
    }


    public function deleteAll(): bool
    {
        $t = new DbTableAirspace();
        $query = $this->dbService->getDeleteCommandBuilder($t)
            ->deleteAllFrom($t)
            ->build();

        return $this->dbService->execCUDQuery($query);
    }
}
