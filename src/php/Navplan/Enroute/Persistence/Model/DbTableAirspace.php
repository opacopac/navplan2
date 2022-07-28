<?php declare(strict_types=1);

namespace Navplan\Enroute\Persistence\Model;


class DbTableAirspace {
    public const TABLE_NAME = "openaip_airspace2";
    public const COL_ID = "id";
    public const COL_CLASS = "class";
    public const COL_TYPE = "type";
    public const COL_CATEGORY = "category";
    public const COL_COUNTRY = "country";
    public const COL_NAME = "name";
    public const COL_ALT_BOT_HEIGHT = "alt_bottom_height";
    public const COL_ALT_BOT_UNIT = "alt_bottom_unit";
    public const COL_ALT_BOT_REF = "alt_bottom_reference";
    public const COL_ALT_TOP_HEIGHT = "alt_top_height";
    public const COL_ALT_TOP_UNIT = "alt_top_unit";
    public const COL_ALT_TOP_REF = "alt_top_reference";
    public const COL_POLYGON = "polygon";
    public const COL_EXTENT = "extent";
    public const COL_DIAMETER = "diameter";
}
