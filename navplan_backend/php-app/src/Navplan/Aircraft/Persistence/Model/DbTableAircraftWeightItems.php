<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;


class DbTableAircraftWeightItems
{
    public const TABLE_NAME = "aircraft_weight_items";
    public const COL_ID = "id";
    public const COL_ID_AIRCRAFT = "aircraft_id";
    public const COL_TYPE = "type";
    public const COL_NAME = "name";
    public const COL_ARM_LONG_M = "arm_long_m";
    public const COL_ARM_LAT_M = "arm_lat_m";
    public const COL_MAX_WEIGHT_KG = "max_weight_kg";
    public const COL_MAX_FUEL_L = "max_fuel_l";
    public const COL_DEFAULT_WEIGHT_KG = "default_weight_kg";
    public const COL_DEFAULT_FUEL_L = "default_fuel_l";
}
