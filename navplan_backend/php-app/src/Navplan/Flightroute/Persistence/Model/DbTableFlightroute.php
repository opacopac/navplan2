<?php declare(strict_types=1);

namespace Navplan\Flightroute\Persistence\Model;


class DbTableFlightroute {
    public const TABLE_NAME = "navplan";
    public const COL_ID = "id";
    public const COL_ID_USER = "user_id";
    public const COL_SHARE_ID = "share_id";
    public const COL_MD5_HASH = "md5_hash";
    public const COL_TITLE = "title";
    public const COL_AC_SPEED = "aircraft_speed";
    public const COL_AC_CONSUMPTION = "aircraft_consumption";
    public const COL_EXTRA_FUEL = "extra_fuel";
    public const COL_COMMENTS = "comments";
}
