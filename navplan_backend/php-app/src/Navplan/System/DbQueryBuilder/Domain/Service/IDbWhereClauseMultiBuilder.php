<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClauseMulti;

interface IDbWhereClauseMultiBuilder
{
    function clause(DbWhereClauseMulti $clause);

    function build(): string;
}
