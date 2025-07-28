<?php declare(strict_types=1);

namespace Navplan\Webcam\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class DbTableWebcam extends DbTable
{
    public const TABLE_NAME = "webcams";
    public const COL_ID = "id";
    public const COL_NAME = "name";
    public const COL_URL = "url";
    public const COL_LAT = "latitude";
    public const COL_LON = "longitude";
    public const COL_AD_ICAO = "airport_icao";


    public function __construct(string $alias = null)
    {
        parent::__construct(self::TABLE_NAME, $alias);
        $this->addCol(self::COL_ID, DbColType::INT);
        $this->addCol(self::COL_NAME, DbColType::STRING);
        $this->addCol(self::COL_URL, DbColType::STRING);
        $this->addCol(self::COL_LAT, DbColType::DOUBLE, true);
        $this->addCol(self::COL_LON, DbColType::DOUBLE, true);
        $this->addCol(self::COL_AD_ICAO, DbColType::STRING, true);
    }


    public function colId(): DbCol
    {
        return self::getCol(self::COL_ID);
    }


    public function colName(): DbCol
    {
        return self::getCol(self::COL_NAME);
    }


    public function colUrl(): DbCol
    {
        return self::getCol(self::COL_URL);
    }


    public function colLat(): DbCol
    {
        return self::getCol(self::COL_LAT);
    }


    public function colLon(): DbCol
    {
        return self::getCol(self::COL_LON);
    }


    public function colAdIcao(): DbCol
    {
        return self::getCol(self::COL_AD_ICAO);
    }
}
