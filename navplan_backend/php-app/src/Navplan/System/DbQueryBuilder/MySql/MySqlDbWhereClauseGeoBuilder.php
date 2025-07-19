<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbWhereClauseGeoBuilder;


class MySqlDbWhereClauseGeoBuilder implements IDbWhereClauseGeoBuilder
{
    private DbWhereGeo $clause;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbWhereClauseGeoBuilder
    {
        return new MySqlDbWhereClauseGeoBuilder($dbService);
    }


    public function clause(DbWhereGeo $clause): MySqlDbWhereClauseGeoBuilder
    {
        $this->clause = $clause;
        return $this;
    }


    public function build(): string
    {
        $opStr = match ($this->clause->operator) {
            DbWhereOpGeo::INTERSECTS_ST => "ST_Intersects",
            DbWhereOpGeo::INTERSECTS_MBR => "MBRIntersects",
        };

        $geoValueStr = match (true) {
            $this->clause->value instanceof Position2d => DbHelper::getDbPointStringFromPos($this->clause->value),
            $this->clause->value instanceof Extent2d => DbHelper::getDbExtentPolygon2($this->clause->value),
            $this->clause->value instanceof Line2d => DbHelper::getDbLineString($this->clause->value->position2dList),
            $this->clause->value instanceof Ring2d => DbHelper::getDbPolygonString($this->clause->value->toArray()),
            default => throw new InvalidArgumentException("Unsupported geometry type for where clause"),
        };

        return $opStr . "(" . $this->clause->colName . ", " . $geoValueStr . ")";
    }
}
