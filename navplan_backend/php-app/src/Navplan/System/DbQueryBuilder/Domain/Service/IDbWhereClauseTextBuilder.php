<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClauseText;

interface IDbWhereClauseTextBuilder
{
    function clause(DbWhereClauseText $clause);

    function build(): string;
}
