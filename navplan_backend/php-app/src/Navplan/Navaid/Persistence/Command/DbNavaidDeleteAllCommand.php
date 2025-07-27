<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Command;

use Navplan\Navaid\Domain\Command\INavaidDeleteAllCommand;
use Navplan\Navaid\Persistence\Model\DbTableNavaid;
use Navplan\System\Db\Domain\Service\IDbService;


class DbNavaidDeleteAllCommand implements INavaidDeleteAllCommand
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function deleteAll(): bool
    {
        $t = new DbTableNavaid();
        $query = $this->dbService->getDeleteCommandBuilder($t)
            ->deleteAllFrom($t)
            ->build();

        return $this->dbService->execCUDQuery($query);
    }
}
