<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereGeo;

interface IDbWhereClauseGeoBuilder
{
    function clause(DbWhereGeo $clause);

    function build(): string;
}
