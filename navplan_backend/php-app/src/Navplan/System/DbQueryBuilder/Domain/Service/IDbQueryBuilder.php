<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhere;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOpTxt;

interface IDbQueryBuilder
{
    function selectAllFrom(string $tableName): IDbQueryBuilder;

    function selectFrom(string $tableName, string ...$colNames): IDbQueryBuilder;

    function whereClause(DbWhere $clause): IDbQueryBuilder;

    function where(string $colName, DbWhereOp $op, string|int|float|bool|null $value): IDbQueryBuilder;

    function whereText(string $colName, DbWhereOpTxt $op, string $value): IDbQueryBuilder;

    function whereGeo(string $colName, DbWhereOpGeo $op, Position2d|Extent2d|Line2d|Ring2d $value): IDbQueryBuilder;

    function whereEquals(string $colName, string|int|float|bool|null $value): IDbQueryBuilder;

    function wherePrefixLike(string $colName, string $value): IDbQueryBuilder;

    public function whereAll(DbWhere ...$clauses): IDbQueryBuilder;

    public function whereAny(DbWhere ...$clauses): IDbQueryBuilder;

    public function whereInMaxDist(string $latColName, string $lonColName, Position2d $pos, float $maxDistDeg): IDbQueryBuilder;

    function orderBy(string $colName, DbSortOrder $direction): IDbQueryBuilder;

    function orderByLatLonDist(string $latColName, string $lonColName, Position2d $pos): IDbQueryBuilder;

    function limit(int $limit): IDbQueryBuilder;

    function build(): string;
}
