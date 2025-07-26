<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class DbTableAirport extends DbTable
{
    public const TABLE_NAME = "openaip_airports2";
    public const COL_ID = "id";
    public const COL_TYPE = "type";
    public const COL_COUNTRY = "country";
    public const COL_NAME = "name";
    public const COL_ICAO = "icao";
    public const COL_LATITUDE = "latitude";
    public const COL_LONGITUDE = "longitude";
    public const COL_ELEVATION = "elevation";
    public const COL_ZOOMMIN = "zoommin";
    public const COL_GEOHASH = "geohash";
    public const COL_LONLAT = "lonlat";


    public function __construct(string $alias = null)
    {
        parent::__construct(self::TABLE_NAME, $alias);

        $this->addCol(self::COL_ID, DbColType::INT);
        $this->addCol(self::COL_TYPE, DbColType::STRING);
        $this->addCol(self::COL_COUNTRY, DbColType::STRING);
        $this->addCol(self::COL_NAME, DbColType::STRING);
        $this->addCol(self::COL_ICAO, DbColType::STRING, true);
        $this->addCol(self::COL_LATITUDE, DbColType::DOUBLE);
        $this->addCol(self::COL_LONGITUDE, DbColType::DOUBLE);
        $this->addCol(self::COL_ELEVATION, DbColType::INT);
        $this->addCol(self::COL_ZOOMMIN, DbColType::INT, true);
        $this->addCol(self::COL_GEOHASH, DbColType::STRING);
        $this->addCol(self::COL_LONLAT, DbColType::GEO_POINT);
    }


    public function colId(): DbCol
    {
        return self::getCol(self::COL_ID);
    }


    public function colType(): DbCol
    {
        return self::getCol(self::COL_TYPE);
    }


    public function colCountry(): DbCol
    {
        return self::getCol(self::COL_COUNTRY);
    }


    public function colName(): DbCol
    {
        return self::getCol(self::COL_NAME);
    }


    public function colIcao(): DbCol
    {
        return self::getCol(self::COL_ICAO);
    }


    public function colLatitude(): DbCol
    {
        return self::getCol(self::COL_LATITUDE);
    }


    public function colLongitude(): DbCol
    {
        return self::getCol(self::COL_LONGITUDE);
    }


    public function colElevation(): DbCol
    {
        return self::getCol(self::COL_ELEVATION);
    }


    public function colZoomMin(): DbCol
    {
        return self::getCol(self::COL_ZOOMMIN);
    }


    public function colGeoHash(): DbCol
    {
        return self::getCol(self::COL_GEOHASH);
    }


    public function colLonLat(): DbCol
    {
        return self::getCol(self::COL_LONLAT);
    }
}
