<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class DbTableMapFeatures extends DbTable
{
    public const TABLE_NAME = "map_features";
    public const COL_ID = "id";
    public const COL_TYPE = "type";
    public const COL_NAME = "name";
    public const COL_AD_ICAO = "airport_icao";
    public const COL_LAT = "latitude";
    public const COL_LON = "longitude";


    public function __construct(string $alias = null)
    {
        parent::__construct(self::TABLE_NAME, $alias);

        $this->addCol(self::COL_ID, DbColType::INT);
        $this->addCol(self::COL_TYPE, DbColType::STRING);
        $this->addCol(self::COL_NAME, DbColType::STRING);
        $this->addCol(self::COL_AD_ICAO, DbColType::STRING, true);
        $this->addCol(self::COL_LAT, DbColType::DOUBLE, true);
        $this->addCol(self::COL_LON, DbColType::DOUBLE, true);
    }


    public function colId(): DbCol
    {
        return self::getCol(self::COL_ID);
    }


    public function colType(): DbCol
    {
        return self::getCol(self::COL_TYPE);
    }


    public function colName(): DbCol
    {
        return self::getCol(self::COL_NAME);
    }


    public function colAdIcao(): DbCol
    {
        return self::getCol(self::COL_AD_ICAO);
    }


    public function colLat(): DbCol
    {
        return self::getCol(self::COL_LAT);
    }


    public function colLon(): DbCol
    {
        return self::getCol(self::COL_LON);
    }
}
