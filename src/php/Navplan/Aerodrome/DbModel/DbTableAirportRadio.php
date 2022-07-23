<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DbModel;


class DbTableAirportRadio {
    public const TABLE_NAME = "openaip_radios2";
    public const COL_ID = "id";
    public const COL_AIRPORT_ID = "airport_id";
    public const COL_CATEGORY = "category";
    public const COL_FREQUENCY = "frequency";
    public const COL_TYPE = "type";
    public const COL_NAME = "name";
    public const COL_IS_PRIMARY = "is_primary";
}
