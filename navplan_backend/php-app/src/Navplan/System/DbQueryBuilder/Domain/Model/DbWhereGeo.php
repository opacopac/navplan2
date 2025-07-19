<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;

class DbWhereGeo extends DbWhere
{
    private function __construct(
        public readonly string $colName,
        public readonly DbWhereOpGeo $operator,
        public readonly Position2d|Extent2d|Line2d $value
    )
    {
    }


    public static function create(
        string $colName,
        DbWhereOpGeo $operator,
        Position2d|Extent2d|Line2d $value
    ): DbWhereGeo
    {
        return new DbWhereGeo($colName, $operator, $value);
    }
}
