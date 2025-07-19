<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereSimple;

interface IDbWhereClauseSimpleBuilder
{
    function clause(DbWhereSimple $clause);

    function build(): string;
}
