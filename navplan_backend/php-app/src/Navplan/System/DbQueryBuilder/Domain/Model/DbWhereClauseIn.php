<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbWhereClauseIn extends DbWhereClause
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
     * @return DbWhereClauseIn
     */
    public static function create(string $colName, array $values): DbWhereClauseIn
    {
        return new DbWhereClauseIn($colName, $values);
    }
}
