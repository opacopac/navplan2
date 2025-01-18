<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;


class DbTableAircraft
{
    public const TABLE_NAME = "aircraft";
    public const COL_ID = "id";
    public const COL_ID_USER = "user_id";
    public const COL_VEHICLE_TYPE = "vehicle_type";
    public const COL_REGISTRATION = "registration";
    public const COL_ICAO_TYPE = "icao_type";
    public const COL_CRUISE_SPEED = "speed";
    public const COL_SPEED_UNIT = "speed_unit";
    public const COL_CRUISE_CONSUMPTION = "cruise_consumption";
    public const COL_CONSUMPTION_UNIT = "consumption_unit";
    public const COL_FUEL_TYPE = "fuel_type";
    public const COL_MTOW = "mtow";
    public const COL_BEW = "bew";
    public const COL_WEIGHT_UNIT = "weight_unit";
}
