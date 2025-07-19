<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbWhereClauseText extends DbWhereClause
{
    private function __construct(
        public readonly string $colName,
        public readonly DbWhereOpTxt $operator,
        public readonly string $value
    )
    {
    }


    public static function create(string $colName, DbWhereOpTxt $operator, string $value): DbWhereClauseText
    {
        return new DbWhereClauseText($colName, $operator, $value);
    }
}
