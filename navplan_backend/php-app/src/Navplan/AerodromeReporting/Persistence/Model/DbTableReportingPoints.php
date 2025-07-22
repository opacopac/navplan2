<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;


class DbTableReportingPoints extends DbTable
{
    public const TABLE_NAME = "reporting_points";
    public const COL_ID = "id";
    public const COL_TYPE = "type";
    public const COL_AD_ICAO = "airport_icao";
    public const COL_NAME = "name";
    public const COL_HELI = "heli";
    public const COL_INBD_COMP = "inbd_comp";
    public const COL_OUTBD_COMP = "outbd_comp";
    public const COL_MIN_FT = "min_ft";
    public const COL_MAX_FT = "max_ft";
    public const COL_LAT = "latitude";
    public const COL_LON = "longitude";
    public const COL_POLYGON = "polygon";
    public const COL_EXTENT = "extent";


    public function __construct(string $alias = null)
    {
        parent::__construct(
            self::TABLE_NAME,
            $alias,
            [
                self::COL_ID,
                self::COL_TYPE,
                self::COL_AD_ICAO,
                self::COL_NAME,
                self::COL_HELI,
                self::COL_INBD_COMP,
                self::COL_OUTBD_COMP,
                self::COL_MIN_FT,
                self::COL_MAX_FT,
                self::COL_LAT,
                self::COL_LON,
                self::COL_POLYGON,
                self::COL_EXTENT
            ]
        );
    }


    public function colId(): DbCol
    {
        return self::getCol(self::COL_ID);
    }


    public function colType(): DbCol
    {
        return self::getCol(self::COL_TYPE);
    }


    public function colAdIcao(): DbCol
    {
        return self::getCol(self::COL_AD_ICAO);
    }


    public function colName(): DbCol
    {
        return self::getCol(self::COL_NAME);
    }


    public function colHeli(): DbCol
    {
        return self::getCol(self::COL_HELI);
    }


    public function colInbdComp(): DbCol
    {
        return self::getCol(self::COL_INBD_COMP);
    }


    public function colOutbdComp(): DbCol
    {
        return self::getCol(self::COL_OUTBD_COMP);
    }


    public function colMinFt(): DbCol
    {
        return self::getCol(self::COL_MIN_FT);
    }


    public function colMaxFt(): DbCol
    {
        return self::getCol(self::COL_MAX_FT);
    }


    public function colLat(): DbCol
    {
        return self::getCol(self::COL_LAT);
    }


    public function colLon(): DbCol
    {
        return self::getCol(self::COL_LON);
    }


    public function colPolygon(): DbCol
    {
        return self::getCol(self::COL_POLYGON);
    }


    public function colExtent(): DbCol
    {
        return self::getCol(self::COL_EXTENT);
    }
}
