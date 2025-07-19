<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbWhereIn extends DbWhere
{
    /**
     * @param string $colName
     * @param string[]|int[]|float[]|bool[] $values
     */
    private function __construct(
        public readonly string $colName,
        public readonly array $values
    )
    {
    }


    /**
     * Creates a DbWhereClauseIn instance.
     *
     * @param string $colName
     * @param string[]|int[]|float[]|bool[] $values
     * @return DbWhereIn
     */
    public static function create(string $colName, array $values): DbWhereIn
    {
        return new DbWhereIn($colName, $values);
    }
}
