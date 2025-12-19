<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;


class DbCondGeo extends DbCond
{
    private function __construct(
        public readonly DbCol|string $column,
        public readonly DbCondOpGeo $operator,
        public readonly Position2d|Extent2d|Line2d|Ring2d $value
    )
    {
    }


    public static function create(
        DbCol|string $colName,
        DbCondOpGeo $operator,
        Position2d|Extent2d|Line2d|Ring2d $value
    ): DbCondGeo
    {
        return new DbCondGeo($colName, $operator, $value);
    }


    public static function inMaxDist(DbCol|string $latColumn, DbCol|string $lonColumn, Position2d $pos, float $maxDistDeg): DbCond
    {
        return DbCondMulti::create(
            DbCondCombinator::AND,
            DbCondSimple::create($latColumn, DbCondOp::GT, $pos->latitude - $maxDistDeg),
            DbCondSimple::create($latColumn, DbCondOp::LT, $pos->latitude + $maxDistDeg),
            DbCondSimple::create($lonColumn, DbCondOp::GT, $pos->longitude - $maxDistDeg),
            DbCondSimple::create($lonColumn, DbCondOp::LT, $pos->longitude + $maxDistDeg)
        );
    }
}
