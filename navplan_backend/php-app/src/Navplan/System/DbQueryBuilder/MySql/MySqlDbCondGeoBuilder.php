<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbCondGeoBuilder;


class MySqlDbCondGeoBuilder implements IDbCondGeoBuilder
{
    private DbCondGeo $cond;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbCondGeoBuilder
    {
        return new MySqlDbCondGeoBuilder($dbService);
    }


    public function condition(DbCondGeo $cond): MySqlDbCondGeoBuilder
    {
        $this->cond = $cond;
        return $this;
    }


    public function build(): string
    {
        $opStr = match ($this->cond->operator) {
            DbCondOpGeo::INTERSECTS_ST => "ST_Intersects",
            DbCondOpGeo::INTERSECTS_MBR => "MBRIntersects",
        };

        $colName = MySqlDbColBuilder::buildColName($this->cond->column);

        $geoValueStr = match (true) {
            $this->cond->value instanceof Position2d => DbHelper::getDbPointStringFromPos($this->cond->value),
            $this->cond->value instanceof Extent2d => DbHelper::getDbExtentPolygon2($this->cond->value),
            $this->cond->value instanceof Line2d => DbHelper::getDbLineString($this->cond->value->position2dList),
            $this->cond->value instanceof Ring2d => DbHelper::getDbPolygonString($this->cond->value->toArray()),
            default => throw new InvalidArgumentException("Unsupported geometry type for where clause"),
        };

        return $opStr . "(" . $colName . ", " . $geoValueStr . ")";
    }
}
