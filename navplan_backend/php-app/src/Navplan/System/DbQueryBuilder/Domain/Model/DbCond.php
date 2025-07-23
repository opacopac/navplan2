<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


abstract class DbCond
{
    public static function equals(DbCol|string $column, string|int|float|bool|null $value): DbCond
    {
        return DbCondSimple::create($column, DbCondOp::EQ, $value);
    }
}
