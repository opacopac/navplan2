<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCond;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


interface IDbQueryBuilder
{
    function selectAllFrom(DbTable|string $table): IDbQueryBuilder;

    function selectFrom(string $table, string|DbCol ...$columns): IDbQueryBuilder;

    function where(): IDbWhereClauseBuilder;

    function whereCondition(DbCond $cond): IDbQueryBuilder;

    function whereEquals(DbCol|string $column, string|int|float|bool|null $value): IDbQueryBuilder;

    function orderBy(DbCol|string $column, DbSortOrder $direction): IDbQueryBuilder;

    function orderByLatLonDist(DbCol|string $latColumn, DbCol|string $lonColumn, Position2d $pos): IDbQueryBuilder;

    function limit(int $limit): IDbQueryBuilder;

    function build(): string;
}
