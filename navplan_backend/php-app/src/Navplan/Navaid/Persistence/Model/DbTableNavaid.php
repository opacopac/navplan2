<?php declare(strict_types=1);

namespace Navplan\Navaid\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class DbTableNavaid extends DbTable {
    public const TABLE_NAME = "openaip_navaids2";
    public const COL_ID = "id";
    public const COL_TYPE = "type";
    public const COL_KUERZEL = "kuerzel";
    public const COL_NAME = "name";
    public const COL_COUNTRY = "country";
    public const COL_LONGITUDE = "longitude";
    public const COL_LATITUDE = "latitude";
    public const COL_ELEVATION = "elevation";
    public const COL_FREQUENCY = "frequency";
    public const COL_DECLINATION = "declination";
    public const COL_TRUENORTH = "truenorth";
    public const COL_GEOHASH = "geohash";
    public const COL_LONLAT = "lonlat";
    public const COL_ZOOMMIN = "zoommin";


    public function __construct(string $alias = null) {
        parent::__construct(
            self::TABLE_NAME,
            $alias,
            [
                self::COL_ID,
                self::COL_TYPE,
                self::COL_KUERZEL,
                self::COL_NAME,
                self::COL_COUNTRY,
                self::COL_LONGITUDE,
                self::COL_LATITUDE,
                self::COL_ELEVATION,
                self::COL_FREQUENCY,
                self::COL_DECLINATION,
                self::COL_TRUENORTH,
                self::COL_GEOHASH,
                self::COL_LONLAT,
                self::COL_ZOOMMIN
            ]
        );
    }


    public function colId(): DbCol {
        return self::getCol(self::COL_ID);
    }


    public function colType(): DbCol {
        return self::getCol(self::COL_TYPE);
    }


    public function colKuerzel(): DbCol {
        return self::getCol(self::COL_KUERZEL);
    }


    public function colName(): DbCol {
        return self::getCol(self::COL_NAME);
    }


    public function colCountry(): DbCol {
        return self::getCol(self::COL_COUNTRY);
    }


    public function colLongitude(): DbCol {
        return self::getCol(self::COL_LONGITUDE);
    }


    public function colLatitude(): DbCol {
        return self::getCol(self::COL_LATITUDE);
    }


    public function colElevation(): DbCol {
        return self::getCol(self::COL_ELEVATION);
    }


    public function colFrequency(): DbCol {
        return self::getCol(self::COL_FREQUENCY);
    }


    public function colDeclination(): DbCol {
        return self::getCol(self::COL_DECLINATION);
    }


    public function colTrueNorth(): DbCol {
        return self::getCol(self::COL_TRUENORTH);
    }


    public function colGeohash(): DbCol {
        return self::getCol(self::COL_GEOHASH);
    }


    public function colLonLat(): DbCol {
        return self::getCol(self::COL_LONLAT);
    }


    public function colZoomMin(): DbCol {
        return self::getCol(self::COL_ZOOMMIN);
    }
}
