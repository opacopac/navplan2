<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereText;

interface IDbWhereClauseTextBuilder
{
    function clause(DbWhereText $clause);

    function build(): string;
}
