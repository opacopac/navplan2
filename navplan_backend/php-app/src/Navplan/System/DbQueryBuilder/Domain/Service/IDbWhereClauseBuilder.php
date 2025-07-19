<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbWhere;

interface IDbWhereClauseBuilder
{
    function clause(DbWhere $clause);

    function build(): string;
}
