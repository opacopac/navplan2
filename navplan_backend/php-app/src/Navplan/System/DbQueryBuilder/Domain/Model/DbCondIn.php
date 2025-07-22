<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbCondIn extends DbCond
{
    /**
     * @param DbCol|string $column
     * @param string[]|int[]|float[]|bool[] $values
     */
    private function __construct(
        public readonly DbCol|string $column,
        public readonly array $values
    )
    {
    }


    /**
     * Creates a DbWhereClauseIn instance.
     *
     * @param DbCol|string $column
     * @param string[]|int[]|float[]|bool[] $values
     * @return DbCondIn
     */
    public static function create(DbCol|string $column, array $values): DbCondIn
    {
        return new DbCondIn($column, $values);
    }
}
