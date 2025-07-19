<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereMulti;

interface IDbWhereClauseMultiBuilder
{
    function clause(DbWhereMulti $clause);

    function build(): string;
}
