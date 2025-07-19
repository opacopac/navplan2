<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClauseGeo;

interface IDbWhereClauseGeoBuilder
{
    function clause(DbWhereClauseGeo $clause);

    function build(): string;
}
