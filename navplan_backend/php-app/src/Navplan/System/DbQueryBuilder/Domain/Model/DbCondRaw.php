<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbCondRaw extends DbCond
{
    private function __construct(
        public readonly string $rawSql
    )
    {
    }


    public static function create(string $rawSql): DbCondRaw
    {
        return new DbCondRaw($rawSql);
    }
}
