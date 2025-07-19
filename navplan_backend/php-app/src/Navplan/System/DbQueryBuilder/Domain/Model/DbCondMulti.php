<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbCondMulti extends DbCond
{
    /**
     * @param DbCondCombinator $combinator
     * @param DbCond[] $clauses
     */
    private function __construct(
        public readonly DbCondCombinator $combinator,
        public readonly array $clauses
    )
    {
    }


    /**
     * @param DbCondCombinator $combinator
     * @param DbCond ...$clauses
     * @return DbCondMulti
     */
    public static function create(DbCondCombinator $combinator, DbCond ...$clauses): DbCondMulti
    {
        return new DbCondMulti($combinator, $clauses);
    }
}
