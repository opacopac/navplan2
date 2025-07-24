<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class DbTableNavaid extends DbTable
{
    public const TABLE_NAME = "openaip_navaids2";
    public const COL_ID = "id";
    public const COL_TYPE = "type";
    public const COL_COUNTRY = "country";
    public const COL_NAME = "name";
    public const COL_KUERZEL = "kuerzel";
    public const COL_LATITUDE = "latitude";
    public const COL_LONGITUDE = "longitude";
    public const COL_ELEVATION = "elevation";
    public const COL_FREQUENCY = "frequency";
    public const COL_DECLINATION = "declination";
    public const COL_TRUENORTH = "truenorth";
    public const COL_ZOOMMIN = "zoommin";
    public const COL_GEOHASH = "geohash";
    public const COL_LONLAT = "lonlat";
    public const COL_CREATED_AT = "created_at";


    public function __construct(string $alias = null)
    {
        parent::__construct(self::TABLE_NAME, $alias);
        $this->addCol(self::COL_ID, DbColType::INT);
        $this->addCol(self::COL_TYPE, DbColType::STRING);
        $this->addCol(self::COL_COUNTRY, DbColType::STRING);
        $this->addCol(self::COL_NAME, DbColType::STRING);
        $this->addCol(self::COL_KUERZEL, DbColType::STRING);
        $this->addCol(self::COL_LATITUDE, DbColType::DOUBLE);
        $this->addCol(self::COL_LONGITUDE, DbColType::DOUBLE);
        $this->addCol(self::COL_ELEVATION, DbColType::DOUBLE);
        $this->addCol(self::COL_FREQUENCY, DbColType::STRING);
        $this->addCol(self::COL_DECLINATION, DbColType::DOUBLE);
        $this->addCol(self::COL_TRUENORTH, DbColType::BOOL);
        $this->addCol(self::COL_ZOOMMIN, DbColType::INT, true);
        $this->addCol(self::COL_GEOHASH, DbColType::STRING);
        $this->addCol(self::COL_LONLAT, DbColType::GEO_POINT);
        $this->addCol(self::COL_CREATED_AT, DbColType::TIMESTAMP);
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


    public function colKuerzel(): DbCol
    {
        return self::getCol(self::COL_KUERZEL);
    }


    public function colLat(): DbCol
    {
        return self::getCol(self::COL_LATITUDE);
    }


    public function colLon(): DbCol
    {
        return self::getCol(self::COL_LONGITUDE);
    }


    public function colElevation(): DbCol
    {
        return self::getCol(self::COL_ELEVATION);
    }


    public function colFrequency(): DbCol
    {
        return self::getCol(self::COL_FREQUENCY);
    }


    public function colDeclination(): DbCol
    {
        return self::getCol(self::COL_DECLINATION);
    }


    public function colTrueNorth(): DbCol
    {
        return self::getCol(self::COL_TRUENORTH);
    }


    public function colZoomMin(): DbCol
    {
        return self::getCol(self::COL_ZOOMMIN);
    }


    public function colGeohash(): DbCol
    {
        return self::getCol(self::COL_GEOHASH);
    }


    public function colLonLat(): DbCol
    {
        return self::getCol(self::COL_LONLAT);
    }


    public function colCreatedAt(): DbCol
    {
        return self::getCol(self::COL_CREATED_AT);
    }
}
