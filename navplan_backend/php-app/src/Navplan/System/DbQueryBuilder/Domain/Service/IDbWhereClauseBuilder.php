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


interface IDbWhereClauseBuilder
{
    function condition(DbCond $cond): IDbWhereClauseBuilder;

    function op(DbCol|string $column, DbCondOp $op, string|int|float|bool|null $value): IDbWhereClauseBuilder;

    function text(DbCol|string $column, DbCondOpTxt $op, string $value): IDbWhereClauseBuilder;

    function geo(DbCol|string $column, DbCondOpGeo $op, Position2d|Extent2d|Line2d|Ring2d $value): IDbWhereClauseBuilder;

    function equals(DbCol|string $column, string|int|float|bool|null $value): IDbWhereClauseBuilder;

    function prefixLike(DbCol|string $column, string $value): IDbWhereClauseBuilder;

    public function all(DbCond ...$conditions): IDbWhereClauseBuilder;

    public function any(DbCond ...$conditions): IDbWhereClauseBuilder;

    public function inMaxDist(DbCol|string $latColumn, DbCol|string $lonColumn, Position2d $pos, float $maxDistDeg): IDbWhereClauseBuilder;

    function end(): IDbQueryBuilder;
}
