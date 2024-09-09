<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;


class DbTableAircraftTypeDesignator
{
    public const TABLE_NAME = "icao_aircraft_type";
    public const COL_ID = "id";
    public const COL_DESIGNATOR = "designator";
    public const COL_MODEL = "model";
    public const COL_MANUFACTURER = "manufacturer";
    public const COL_AC_TYPE = "ac_type";
    public const COL_ENG_TYPE = "eng_type";
    public const COL_ENG_COUNT = "eng_count";
    public const COL_WTC = "wtc";
}
