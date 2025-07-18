<?php declare(strict_types=1);

namespace Navplan\System\Domain\Service;


use Navplan\System\Domain\Model\DbSortDirection;
use Navplan\System\Domain\Model\DbWhereClause;

interface IDbQueryBuilder
{
    function selectAllFrom(string $tableName): IDbQueryBuilder;

    function where(DbWhereClause $clause): IDbQueryBuilder;

    function whereEquals(string $colName, string|int|float|bool|null $value): IDbQueryBuilder;

    function whereNotEquals(string $colName, string|int|float|bool|null $value): IDbQueryBuilder;

    /**
     * @param $clauses [string, DbWhereOp, string|int|float|bool|null]
     * @return IDbQueryBuilder
     */
    public function whereAll(array $clauses): IDbQueryBuilder;

    /**
     * @param $clauses [string, DbWhereOp, string|int|float|bool|null]
     * @return IDbQueryBuilder
     */
    public function whereAny(array $clauses): IDbQueryBuilder;

    function orderBy(string $colName, DbSortDirection $direction): IDbQueryBuilder;

    function limit(int $limit): IDbQueryBuilder;

    function build(): string;
}
