<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;


class DbCondGeo extends DbCond
{
    private function __construct(
        public readonly DbCol|string $column,
        public readonly DbCondOpGeo $operator,
        public readonly Position2d|Extent2d|Line2d $value
    )
    {
    }


    public static function create(
        DbCol|string $colName,
        DbCondOpGeo $operator,
        Position2d|Extent2d|Line2d $value
    ): DbCondGeo
    {
        return new DbCondGeo($colName, $operator, $value);
    }
}
