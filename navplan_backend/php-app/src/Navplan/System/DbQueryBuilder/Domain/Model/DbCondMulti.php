<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


use InvalidArgumentException;

class DbCondMulti extends DbCond
{
    /**
     * @param DbCondCombinator $combinator
     * @param DbCond[] $conditions
     */
    private function __construct(
        public readonly DbCondCombinator $combinator,
        public readonly array $conditions
    )
    {
    }


    /**
     * @param DbCondCombinator $combinator
     * @param DbCond ...$conditions
     * @return DbCondMulti
     */
    public static function create(DbCondCombinator $combinator, DbCond ...$conditions): DbCondMulti
    {
        if (count($conditions) === 0) {
            throw new InvalidArgumentException("At least one where condition is required");
        }

        return new DbCondMulti($combinator, $conditions);
    }


    public static function all(DbCond ...$conditions): DbCondMulti
    {
        return self::create(DbCondCombinator::AND, ...$conditions);
    }

    
    public static function any(DbCond ...$conditions): DbCondMulti
    {
        return self::create(DbCondCombinator::OR, ...$conditions);
    }
}
