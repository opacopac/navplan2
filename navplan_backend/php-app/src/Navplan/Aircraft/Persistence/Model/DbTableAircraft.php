<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;


class DbTableAircraft {
    public const TABLE_NAME = "aircraft";
    public const COL_ID = "id";
    public const COL_ID_USER = "user_id";
    public const COL_VEHICLE_TYPE = "vehicle_type";
    public const COL_REGISTRATION = "registration";
    public const COL_ICAO_TYPE = "icao_type";
    public const COL_CRUISE_SPEED = "speed_kt";
    public const COL_CRUISE_FUEL = "fuel_l_per_h";
    public const COL_FUEL_TYPE = "fuel_type";
    public const COL_MTOW = "mtow_kg";
    public const COL_BEW = "bew_kg";
}
