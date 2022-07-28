<?php declare(strict_types=1);

namespace Navplan\Enroute\Persistence\Model;


class DbTableNavaid {
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
}
