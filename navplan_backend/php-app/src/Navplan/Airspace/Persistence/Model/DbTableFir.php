<?php declare(strict_types=1);

namespace Navplan\Airspace\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class DbTableFir extends DbTable
{
    public const string TABLE_NAME = "icao_fir";
    public const string COL_ID = "id";
    public const string COL_REGION = "region";
    public const string COL_ICAO = "icao";
    public const string COL_NAME = "name";
    public const string COL_STATE_CODE = "statecode";
    public const string COL_STATE_NAME = "statename";
    public const string COL_CENTER_LAT = "centerlat";
    public const string COL_CENTER_LON = "centerlon";
    public const string COL_POLYGON = "polygon";


    public function __construct(?string $alias = null)
    {
        parent::__construct(self::TABLE_NAME, $alias);
        $this->addCol(self::COL_ID, DbColType::INT);
        $this->addCol(self::COL_REGION, DbColType::STRING);
        $this->addCol(self::COL_ICAO, DbColType::STRING);
        $this->addCol(self::COL_NAME, DbColType::STRING);
        $this->addCol(self::COL_STATE_CODE, DbColType::STRING);
        $this->addCol(self::COL_STATE_NAME, DbColType::STRING);
        $this->addCol(self::COL_CENTER_LAT, DbColType::DOUBLE);
        $this->addCol(self::COL_CENTER_LON, DbColType::DOUBLE);
        $this->addCol(self::COL_POLYGON, DbColType::STRING);
    }


    public function colId(): DbCol
    {
        return $this->getCol(self::COL_ID);
    }


    public function colRegion(): DbCol
    {
        return $this->getCol(self::COL_REGION);
    }


    public function colIcao(): DbCol
    {
        return $this->getCol(self::COL_ICAO);
    }


    public function colName(): DbCol
    {
        return $this->getCol(self::COL_NAME);
    }


    public function colStateCode(): DbCol
    {
        return $this->getCol(self::COL_STATE_CODE);
    }


    public function colStateName(): DbCol
    {
        return $this->getCol(self::COL_STATE_NAME);
    }


    public function colCenterLat(): DbCol
    {
        return $this->getCol(self::COL_CENTER_LAT);
    }


    public function colCenterLon(): DbCol
    {
        return $this->getCol(self::COL_CENTER_LON);
    }


    public function colPolygon(): DbCol
    {
        return $this->getCol(self::COL_POLYGON);
    }
}

