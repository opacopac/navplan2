<?php declare(strict_types=1);

namespace Navplan\Airspace\Persistence\Command;

use Navplan\Airspace\Domain\Command\IAirspaceInsertAllCommand;
use Navplan\Airspace\Persistence\Model\DbAirspaceConverter;
use Navplan\Airspace\Persistence\Model\DbTableAirspace;
use Navplan\System\Db\Domain\Model\DbException;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbInsertCommandBuilder;
use Navplan\System\Domain\Service\ILoggingService;
use Throwable;


class DbAirspaceInsertAllCommand implements IAirspaceInsertAllCommand
{
    public function __construct(
        private readonly IDbService $dbService,
        private readonly ILoggingService $loggingService
    )
    {
    }


    /**
     * @throws Throwable
     * @throws DbException
     */
    public function insertAll(array $airspaces): void
    {
        $t = new DbTableAirspace();
        $converter = new DbAirspaceConverter($t);
        $icb = MySqlDbInsertCommandBuilder::create($this->dbService)->insertInto($t);

        foreach ($airspaces as $airspace) {
            try {
                $converter->bindInsertValues($airspace, $icb);
                $statement = $icb->buildAndBindStatement();
                $statement->execute();
            } catch (Throwable $ex) {
                $this->loggingService->error("error inserting airspace '" . $airspace->name . "'");
                throw $ex;
            }
        }
    }
}
