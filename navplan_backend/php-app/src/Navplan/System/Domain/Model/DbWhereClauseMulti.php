<?php declare(strict_types=1);

namespace Navplan\System\Domain\Model;


class DbWhereClauseMulti extends DbWhereClause
{
    public function __construct(
        public readonly DbWhereCombinator $combinator,
        /**
         * @var DbWhereClause[]
         */
        public readonly array $clauses
    )
    {
    }
}
