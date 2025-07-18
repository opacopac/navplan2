<?php declare(strict_types=1);

namespace Navplan\System\Domain\Service;


use Navplan\System\Domain\Model\DbSortDirection;
use Navplan\System\Domain\Model\DbWhereClause;

interface IDbQueryBuilder
{
    function selectAllFrom(string $tableName): IDbQueryBuilder;

    function where(DbWhereClause $clause): IDbQueryBuilder;

    function whereEquals(string $colName, string|int|float|null $value): IDbQueryBuilder;

    function whereNotEquals(string $colName, string|int|float|null $value): IDbQueryBuilder;

    function orderBy(string $colName, DbSortDirection $direction): IDbQueryBuilder;

    function build(): string;
}
