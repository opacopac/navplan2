<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbCondSimple extends DbCond
{
    private function __construct(
        public readonly string $colName,
        public readonly DbCondOp $operator,
        public readonly string|int|float|bool|null $value
    )
    {
    }


    public static function create(string $colName, DbCondOp $operator, string|int|float|bool|null $value): DbCondSimple
    {
        return new DbCondSimple($colName, $operator, $value);
    }


    public static function equals(string $colName, string|int|float|bool|null $value): DbCondSimple
    {
        return self::create($colName, DbCondOp::EQ, $value);
    }
}
