<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClause;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOpTxt;

interface IDbQueryBuilder
{
    function selectAllFrom(string $tableName): IDbQueryBuilder;

    function selectFrom(string $tableName, string ...$colNames): IDbQueryBuilder;

    function whereClause(DbWhereClause $clause): IDbQueryBuilder;

    function where(string $colName, DbWhereOp $op, string|int|float|bool|null $value): IDbQueryBuilder;

    function whereText(string $colName, DbWhereOpTxt $op, string $value): IDbQueryBuilder;

    function whereGeo(string $colName, DbWhereOpGeo $op, Position2d|Extent2d|Line2d|Ring2d $value): IDbQueryBuilder;

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
