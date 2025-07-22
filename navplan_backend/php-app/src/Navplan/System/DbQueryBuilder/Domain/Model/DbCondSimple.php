<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbCondSimple extends DbCond
{
    private function __construct(
        public readonly DbCol|string $column,
        public readonly DbCondOp $operator,
        public readonly string|int|float|bool|null $value
    )
    {
    }


    public static function create(DbCol|string $column, DbCondOp $operator, string|int|float|bool|null $value): DbCondSimple
    {
        return new DbCondSimple($column, $operator, $value);
    }


    public static function equals(DbCol|string $column, string|int|float|bool|null $value): DbCondSimple
    {
        return self::create($column, DbCondOp::EQ, $value);
    }
}
