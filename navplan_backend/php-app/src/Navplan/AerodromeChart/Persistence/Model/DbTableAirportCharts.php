<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Persistence\Model;


class DbTableAirportCharts
{
    public const TABLE_NAME = "ad_charts2";
    public const COL_ID = "id";
    public const COL_AIRPORT_ID = "airport_id";
    public const COL_USER_ID = "user_id";
    public const COL_SOURCE = "source";
    public const COL_NAME = "name";
    public const COL_ACTIVE = "active";
    public const COL_FILENAME = "filename";
    public const COL_MINLON = "minlon";
    public const COL_MINLAT = "minlat";
    public const COL_MAXLON = "maxlon";
    public const COL_MAXLAT = "maxlat";
    public const COL_IMPORT_FILENAME = "import_filename";
    public const COL_IMPORT_CHECKSUM = "import_checksum";
    public const COL_PDF_PAGE = "pdf_page";
    public const COL_PDF_ROT_DEG = "pdf_rot_deg";
    public const COL_PDF_DPI = "pdf_dpi";
    public const COL_REGISTRATION_TYPE = "registration_type";
    public const COL_GEOCOORD_TYPE = "geocoord_type";
    public const COL_POS1_PIXEL_X = "pos1_pixel_x";
    public const COL_POS1_PIXEL_Y = "pos1_pixel_y";
    public const COL_POS1_GEOCOORD_E = "pos1_geocoord_e";
    public const COL_POS1_GEOCOORD_N = "pos1_geocoord_n";
    public const COL_CHART_SCALE = "chart_scale";
    public const COL_POS2_PIXEL_X = "pos2_pixel_x";
    public const COL_POS2_PIXEL_Y = "pos2_pixel_y";
    public const COL_POS2_GEOCOORD_E = "pos2_geocoord_e";
    public const COL_POS2_GEOCOORD_N = "pos2_geocoord_n";
}
