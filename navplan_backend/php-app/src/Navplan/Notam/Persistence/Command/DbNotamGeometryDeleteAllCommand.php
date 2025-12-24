<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Command;

use Navplan\Notam\Domain\Command\INotamGeometryDeleteAllCommand;
use Navplan\Notam\Persistence\Model\DbTableNotamGeometry;
use Navplan\System\Db\Domain\Service\IDbService;


readonly class DbNotamGeometryDeleteAllCommand implements INotamGeometryDeleteAllCommand
{
    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function deleteAll(): bool
    {
        $t = new DbTableNotamGeometry();

        $query = "TRUNCATE TABLE " . $t->getName();
        return $this->dbService->execCUDQuery($query, "error truncating notam geometry table");
    }
}
