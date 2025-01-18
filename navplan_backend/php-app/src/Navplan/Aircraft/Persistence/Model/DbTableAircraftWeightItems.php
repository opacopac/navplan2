<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;


class DbTableAircraftWeightItems
{
    public const TABLE_NAME = "aircraft_weight_items";
    public const COL_ID = "id";
    public const COL_ID_AIRCRAFT = "aircraft_id";
    public const COL_TYPE = "type";
    public const COL_NAME = "name";
    public const COL_ARM_LONG = "arm_long";
    public const COL_ARM_LAT = "arm_lat";
    public const COL_ARM_UNIT = "arm_unit";
    public const COL_MAX_WEIGHT = "max_weight";
    public const COL_DEFAULT_WEIGHT = "default_weight";
    public const COL_WEIGHT_UNIT = "weight_unit";
    public const COL_MAX_FUEL = "max_fuel";
    public const COL_DEFAULT_FUEL = "default_fuel";
    public const COL_FUEL_UNIT = "fuel_unit";
}
