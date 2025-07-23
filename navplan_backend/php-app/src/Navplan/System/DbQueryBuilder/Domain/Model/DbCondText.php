<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbCondText extends DbCond
{
    private function __construct(
        public readonly DbCol|string $column,
        public readonly DbCondOpTxt $operator,
        public readonly string $value
    )
    {
    }


    public static function create(DbCol|string $column, DbCondOpTxt $operator, string $value): DbCondText
    {
        return new DbCondText($column, $operator, $value);
    }


    public static function prefixLike(DbCol|string $column, string $value): DbCondText
    {
        return self::create($column, DbCondOpTxt::LIKE_PREFIX, $value);
    }
}
