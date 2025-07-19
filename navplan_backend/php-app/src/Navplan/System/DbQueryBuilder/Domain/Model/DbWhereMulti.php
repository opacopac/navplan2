<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbWhereMulti extends DbWhere
{
    /**
     * @param DbWhereCombinator $combinator
     * @param DbWhere[] $clauses
     */
    private function __construct(
        public readonly DbWhereCombinator $combinator,
        public readonly array $clauses
    )
    {
    }


    /**
     * @param DbWhereCombinator $combinator
     * @param DbWhere ...$clauses
     * @return DbWhereMulti
     */
    public static function create(DbWhereCombinator $combinator, DbWhere ...$clauses): DbWhereMulti
    {
        return new DbWhereMulti($combinator, $clauses);
    }
}
