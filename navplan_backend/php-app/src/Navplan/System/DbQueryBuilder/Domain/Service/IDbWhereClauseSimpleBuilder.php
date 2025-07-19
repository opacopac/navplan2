<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClauseSimple;

interface IDbWhereClauseSimpleBuilder
{
    function clause(DbWhereClauseSimple $clause);

    function build(): string;
}
