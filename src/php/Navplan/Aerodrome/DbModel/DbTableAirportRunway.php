<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DbModel;


class DbTableAirportRunway {
    public const TABLE_NAME = "openaip_runways2";
    public const COL_ID = "id";
    public const COL_AIRPORT_ID = "airport_id";
    public const COL_OPERATIONS = "operations";
    public const COL_NAME = "name";
    public const COL_SURFACE = "surface";
    public const COL_LENGTH = "length";
    public const COL_WIDTH = "width";
    public const COL_DIRECTION = "direction";
    public const COL_TORA = "tora";
    public const COL_LDA = "lda";
    public const COL_PAPI = "papi";
}
