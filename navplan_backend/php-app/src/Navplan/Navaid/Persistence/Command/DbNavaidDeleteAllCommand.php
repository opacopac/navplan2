<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Command;

use Navplan\Navaid\Domain\Command\INavaidDeleteAllCommand;
use Navplan\Navaid\Persistence\Model\DbTableNavaid;
use Navplan\System\Db\Domain\Service\IDbService;


readonly class DbNavaidDeleteAllCommand implements INavaidDeleteAllCommand
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function deleteAll(): bool
    {
        $t = new DbTableNavaid();
        $query = $this->dbService->getDeleteCommandBuilder($t)
            ->deleteFrom($t)
            ->build();

        return $this->dbService->execCUDQuery($query);
    }
}
