<?php declare(strict_types=1);

namespace Navplan\System\Db\Domain\Model;


/**
 * @template ENTITY
 */
abstract class DbEntityConverter
{
    /**
     * @param IDbResult $result
     * @return ENTITY[]
     */
    public function fromDbResult(IDbResult $result): array
    {
        $reportingPoints = [];
        while ($row = $result->fetch_assoc()) {
            $reportingPoints[] = $this->fromDbRow($row);
        }
        return $reportingPoints;
    }


    /**
     * @param array $row
     * @return ENTITY
     */
    public abstract function fromDbRow(array $row): mixed;
}
