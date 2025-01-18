<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;


class DbTableAircraftWnbEnvelopes
{
    public const TABLE_NAME = "aircraft_wnb_envelopes";
    public const COL_ID = "id";
    public const COL_ID_AIRCRAFT = "aircraft_id";
    public const COL_NAME = "name";
    public const COL_AXIS_TYPE = "axis_type";
    public const COL_LON_ENVELOPE = "lon_envelope";
    public const COL_LAT_ENVELOPE = "lat_envelope";
    public const COL_ARM_UNIT = "arm_unit";
    public const COL_WEIGHT_UNIT = "weight_unit";
}
