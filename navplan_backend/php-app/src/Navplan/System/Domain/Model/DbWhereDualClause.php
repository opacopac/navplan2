<?php declare(strict_types=1);

namespace Navplan\System\Domain\Model;


class DbWhereDualClause extends DbWhereClause
{
    public function __construct(
        public readonly DbWhereClause $clause1,
        public readonly DbWhereCombinator $combinator,
        public readonly DbWhereClause $clause2
    )
    {
    }
}
