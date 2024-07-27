<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;


class DbTableAircraftPerfDist
{
    public const TABLE_NAME = "aircraft_perf_dist";
    public const COL_ID = "id";
    public const COL_ID_AIRCRAFT = "aircraft_id";
    public const COL_TYPE = "type";
    public const COL_TKOFF_WEIGHT_KF = "tkoff_weight_kg";
    public const COL_ALT_REF = "alt_ref";
    public const COL_ALT_STEPS_FT = "alt_steps_ft";
    public const COL_TEMP_REF = "temp_ref";
    public const COL_TEMP_STEPS_C = "temp_steps_c";
    public const COL_DISTANCES_M = "distances_m";
    public const COL_GRASS_RWY_INC_PERC = "grass_rwy_inc_perc";
    public const COL_WET_RWY_INC_PERC = "wet_rwy_inc_perc";
    public const COL_HEADWIND_DEC_PERC = "headwind_dec_perc";
    public const COL_HEADWIND_DEC_PER_SPEED_KT = "headwind_dec_per_speed_kt";
    public const COL_TAILWIND_INC_PERC = "tailwind_inc_perc";
    public const COL_TAILWIND_INC_PER_SPEED_KT = "tailwind_inc_per_speed_kt";
}
