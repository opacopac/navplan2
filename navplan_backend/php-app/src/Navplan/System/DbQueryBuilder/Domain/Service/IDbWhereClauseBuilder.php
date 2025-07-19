<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClause;

interface IDbWhereClauseBuilder
{
    function clause(DbWhereClause $clause);

    function build(): string;
}
