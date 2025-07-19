<?php declare(strict_types=1);

namespace Navplan\System\Domain\Service;


use Navplan\System\Domain\Model\DbSortOrder;
use Navplan\System\Domain\Model\DbWhereClause;
use Navplan\System\Domain\Model\DbWhereOp;

interface IDbQueryBuilder
{
    function selectAllFrom(string $tableName): IDbQueryBuilder;

    function whereClause(DbWhereClause $clause): IDbQueryBuilder;

    function where(string $colName, DbWhereOp $op, string|int|float|bool|null $value): IDbQueryBuilder;

    function whereEquals(string $colName, string|int|float|bool|null $value): IDbQueryBuilder;

    function wherePrefixLike(string $colName, string $value): IDbQueryBuilder;

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

    function orderBy(string $colName, DbSortOrder $direction): IDbQueryBuilder;

    function limit(int $limit): IDbQueryBuilder;

    function build(): string;
}
