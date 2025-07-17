<?php declare(strict_types=1);

namespace Navplan\System\Domain\Service;


use Navplan\System\Domain\Model\DbSortDirection;

interface IDbQueryBuilder
{
    function selectAllFrom(string $tableName): IDbQueryBuilder;

    function whereEquals(string $colName, string|int|float $value): IDbQueryBuilder;

    function orderBy(string $colName, DbSortDirection $direction): IDbQueryBuilder;

    function build(): string;
}
