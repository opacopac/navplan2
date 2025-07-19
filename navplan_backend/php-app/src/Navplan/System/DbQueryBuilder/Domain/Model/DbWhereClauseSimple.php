<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbWhereClauseSimple extends DbWhereClause
{
    private function __construct(
        public readonly string $colName,
        public readonly DbWhereOp $operator,
        public readonly string|int|float|bool|null $value
    )
    {
    }


    public static function create(string $colName, DbWhereOp $operator, string|int|float|bool|null $value): DbWhereClauseSimple
    {
        return new DbWhereClauseSimple($colName, $operator, $value);
    }
}
