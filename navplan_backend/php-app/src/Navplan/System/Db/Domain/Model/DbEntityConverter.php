<?php declare(strict_types=1);

namespace Navplan\System\Db\Domain\Model;


/**
 * @template T
 */
abstract class DbEntityConverter
{
    /**
     * @param IDbResult $result
     * @return T[]
     */
    public function fromDbResult(IDbResult $result): array
    {
        $reportingPoints = [];
        while ($row = $result->fetch_assoc()) {
            $reportingPoints[] = static::fromDbRow($row);
        }
        return $reportingPoints;
    }


    /**
     * @param array $row
     * @return T
     */
    public abstract function fromDbRow(array $row): mixed;
}
