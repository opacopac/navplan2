<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbExpFunction extends DbExp
{
    private function __construct(
        public readonly DbFunction|string $function,

        /**
         * @var DbCol|string[]
         */
        public readonly array $args
    )
    {
    }


    public static function create(DbFunction|string $function, DbCol|string ...$args): DbExpFunction
    {
        return new DbExpFunction($function, $args);
    }
}
