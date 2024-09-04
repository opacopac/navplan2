<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;


class DbTableAircraftWnbEnvelopes
{
    public const TABLE_NAME = "aircraft_wnb_envelopes";
    public const COL_ID = "id";
    public const COL_ID_AIRCRAFT = "aircraft_id";
    public const COL_NAME = "name";
    public const COL_AXIS_TYPE = "axis_type";
    public const COL_ARM_DIRECTION = "arm_direction";
    public const COL_COORDINATES_KG_M = "coordinates_kg_m";
}
