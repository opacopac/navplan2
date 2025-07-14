<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Persistence\Model;


class DbTableReportingPoints
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
}
