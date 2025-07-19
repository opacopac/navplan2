<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbCondText extends DbCond
{
    private function __construct(
        public readonly string $colName,
        public readonly DbCondOpTxt $operator,
        public readonly string $value
    )
    {
    }


    public static function create(string $colName, DbCondOpTxt $operator, string $value): DbCondText
    {
        return new DbCondText($colName, $operator, $value);
    }
}
