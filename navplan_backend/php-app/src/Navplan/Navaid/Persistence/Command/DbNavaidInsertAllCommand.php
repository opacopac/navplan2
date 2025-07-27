<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Command;

use Navplan\Navaid\Domain\Command\INavaidInsertAllCommand;
use Navplan\Navaid\Persistence\Model\DbNavaidConverter;
use Navplan\Navaid\Persistence\Model\DbTableNavaid;
use Navplan\System\Db\Domain\Model\DbException;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbInsertCommandBuilder;
use Navplan\System\Domain\Service\ILoggingService;
use Throwable;


class DbNavaidInsertAllCommand implements INavaidInsertAllCommand
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
    public function insertAll(array $navaids): void
    {
        $t = new DbTableNavaid();
        $converter = new DbNavaidConverter($t);
        $icb = MySqlDbInsertCommandBuilder::create($this->dbService)->insertInto($t);

        foreach ($navaids as $navaid) {
            try {
                $converter->bindInsertValues($navaid, $icb);
                $statement = $icb->buildAndBindStatement();
                $statement->execute();
            } catch (Throwable $ex) {
                $this->loggingService->error("error inserting navaid '" . $navaid->name . "'");
                throw $ex;
            }
        }
    }
}
