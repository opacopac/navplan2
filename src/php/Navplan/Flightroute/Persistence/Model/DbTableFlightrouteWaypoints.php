<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Model;


class DbTableFlightrouteWaypoints {
    public const TABLE_NAME = "navplan_waypoints";
    public const COL_ID = "id";
    public const COL_ID_FLIGHTROUTE = "navplan_id";
    public const COL_SORTORDER = "sortorder";
    public const COL_TYPE = "type";
    public const COL_FREQUENCY = "freq";
    public const COL_CALLSIGN = "callsign";
    public const COL_CHECKPOINT = "checkpoint";
    public const COL_AD_ICAO = "airport_icao";
    public const COL_LATITUDE = "latitude";
    public const COL_LONGITUDE = "longitude";
    public const COL_ALTITUDE = "alt";
    public const COL_IS_MIN_ALT = "isminalt";
    public const COL_IS_MAX_ALT = "ismaxalt";
    public const COL_IS_ALT_AT_LEG_START = "isaltatlegstart";
    public const COL_REMARK = "remark";
    public const COL_SUPP_INFO = "supp_info";
    public const COL_IS_ALTERNATE = "is_alternate";
}
