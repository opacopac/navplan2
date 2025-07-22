<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Service;


use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCond;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpTxt;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;

interface IDbQueryBuilder
{
    function selectAllFrom(DbTable|string $table): IDbQueryBuilder;

    function selectFrom(string $table, string|DbCol ...$columns): IDbQueryBuilder;

    function whereCondition(DbCond $cond): IDbQueryBuilder;

    function where(DbCol|string $column, DbCondOp $op, string|int|float|bool|null $value): IDbQueryBuilder;

    function whereText(DbCol|string $column, DbCondOpTxt $op, string $value): IDbQueryBuilder;

    function whereGeo(DbCol|string $column, DbCondOpGeo $op, Position2d|Extent2d|Line2d|Ring2d $value): IDbQueryBuilder;

    function whereEquals(DbCol|string $column, string|int|float|bool|null $value): IDbQueryBuilder;

    function wherePrefixLike(DbCol|string $column, string $value): IDbQueryBuilder;

    public function whereAll(DbCond ...$conditions): IDbQueryBuilder;

    public function whereAny(DbCond ...$conditions): IDbQueryBuilder;

    public function whereInMaxDist(DbCol|string $latColumn, string $lonColumn, Position2d $pos, float $maxDistDeg): IDbQueryBuilder;

    function orderBy(DbCol|string $column, DbSortOrder $direction): IDbQueryBuilder;

    function orderByLatLonDist(DbCol|string $latColumn, DbCol|string $lonColumn, Position2d $pos): IDbQueryBuilder;

    function limit(int $limit): IDbQueryBuilder;

    function build(): string;
}
