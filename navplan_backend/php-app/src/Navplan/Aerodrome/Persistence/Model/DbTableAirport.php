<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Model;


class DbTableAirport {
    public const TABLE_NAME = "openaip_airports2";
    public const COL_ID = "id";
    public const COL_TYPE = "type";
    public const COL_NAME = "name";
    public const COL_ICAO = "icao";
    public const COL_COUNTRY = "country";
    public const COL_LONGITUDE = "longitude";
    public const COL_LATITUDE = "latitude";
    public const COL_ELEVATION = "elevation";
    public const COL_GEOHASH = "geohash";
    public const COL_LONLAT = "lonlat";
    public const COL_ZOOMMIN = "zoommin";
}
