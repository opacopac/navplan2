<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;


class DbTableAircraftPerfDist
{
    public const TABLE_NAME = "aircraft_perf_dist";
    public const COL_ID = "id";
    public const COL_ID_AIRCRAFT = "aircraft_id";
    public const COL_TYPE = "type";
    public const COL_TKOFF_WEIGHT = "tkoff_weight";
    public const COL_WEIGHT_UNIT = "weight_unit";
    public const COL_ALT_REF = "alt_ref";
    public const COL_ALT_STEPS = "alt_steps";
    public const COL_ALT_UNIT = "alt_unit";
    public const COL_TEMP_REF = "temp_ref";
    public const COL_TEMP_STEPS = "temp_steps";
    public const COL_TEMP_UNIT = "temp_unit";
    public const COL_DISTANCES = "distances";
    public const COL_DISTANCE_UNIT = "distance_unit";
    public const COL_HEADWIND_DEC_PERC = "headwind_dec_perc";
    public const COL_HEADWIND_DEC_PER_SPEED = "headwind_dec_per_speed";
    public const COL_TAILWIND_INC_PERC = "tailwind_inc_perc";
    public const COL_TAILWIND_INC_PER_SPEED = "tailwind_inc_per_speed";
    public const COL_SPEED_UNIT = "speed_unit";
    public const COL_GRASS_RWY_INC_PERC = "grass_rwy_inc_perc";
    public const COL_WET_RWY_INC_PERC = "wet_rwy_inc_perc";
}
