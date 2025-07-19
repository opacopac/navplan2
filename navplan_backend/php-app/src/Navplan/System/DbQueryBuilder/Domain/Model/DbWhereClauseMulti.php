<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbWhereClauseMulti extends DbWhereClause
{
    /**
     * @param DbWhereCombinator $combinator
     * @param DbWhereClause[] $clauses
     */
    private function __construct(
        public readonly DbWhereCombinator $combinator,
        public readonly array $clauses
    )
    {
    }


    /**
     * @param DbWhereCombinator $combinator
     * @param DbWhereClause ...$clauses
     * @return DbWhereClauseMulti
     */
    public static function create(DbWhereCombinator $combinator, DbWhereClause ...$clauses): DbWhereClauseMulti
    {
        return new DbWhereClauseMulti($combinator, $clauses);
    }
}
