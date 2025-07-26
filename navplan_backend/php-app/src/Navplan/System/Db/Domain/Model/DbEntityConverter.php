<?php declare(strict_types=1);

namespace Navplan\System\Db\Domain\Model;


use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;

/**
 * @template ENTITY
 * @template TABLE of DbTable
 */
abstract class DbEntityConverter
{
    /**
     * @param TABLE $table
     * @param IDbResult $result
     * @return ENTITY[]
     */
    public function fromDbResult($table, IDbResult $result): array
    {
        $reportingPoints = [];
        while ($row = $result->fetch_assoc()) {
            $reportingPoints[] = $this->fromDbRow($table, $row);
        }
        return $reportingPoints;
    }


    /**
     * @param TABLE $table
     * @param array $row
     * @return ENTITY
     */
    public abstract function fromDbRow($table, array $row): mixed;
}
