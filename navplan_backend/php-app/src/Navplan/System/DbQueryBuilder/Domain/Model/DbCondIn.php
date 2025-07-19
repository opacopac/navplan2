<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbCondIn extends DbCond
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
     * @return DbCondIn
     */
    public static function create(string $colName, array $values): DbCondIn
    {
        return new DbCondIn($colName, $values);
    }
}
