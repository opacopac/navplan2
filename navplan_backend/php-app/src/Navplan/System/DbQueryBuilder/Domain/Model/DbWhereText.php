<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbWhereText extends DbWhere
{
    private function __construct(
        public readonly string $colName,
        public readonly DbWhereOpTxt $operator,
        public readonly string $value
    )
    {
    }


    public static function create(string $colName, DbWhereOpTxt $operator, string $value): DbWhereText
    {
        return new DbWhereText($colName, $operator, $value);
    }
}
