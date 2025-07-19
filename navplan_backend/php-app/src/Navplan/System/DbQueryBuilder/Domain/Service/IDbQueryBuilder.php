<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCond;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpTxt;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;

interface IDbQueryBuilder
{
    function selectAllFrom(string $tableName): IDbQueryBuilder;

    function selectFrom(string $tableName, string ...$colNames): IDbQueryBuilder;

    function whereCondition(DbCond $cond): IDbQueryBuilder;

    function where(string $colName, DbCondOp $op, string|int|float|bool|null $value): IDbQueryBuilder;

    function whereText(string $colName, DbCondOpTxt $op, string $value): IDbQueryBuilder;

    function whereGeo(string $colName, DbCondOpGeo $op, Position2d|Extent2d|Line2d|Ring2d $value): IDbQueryBuilder;

    function whereEquals(string $colName, string|int|float|bool|null $value): IDbQueryBuilder;

    function wherePrefixLike(string $colName, string $value): IDbQueryBuilder;

    public function whereAll(DbCond ...$conditions): IDbQueryBuilder;

    public function whereAny(DbCond ...$conditions): IDbQueryBuilder;

    public function whereInMaxDist(string $latColName, string $lonColName, Position2d $pos, float $maxDistDeg): IDbQueryBuilder;

    function orderBy(string $colName, DbSortOrder $direction): IDbQueryBuilder;

    function orderByLatLonDist(string $latColName, string $lonColName, Position2d $pos): IDbQueryBuilder;

    function limit(int $limit): IDbQueryBuilder;

    function build(): string;
}
