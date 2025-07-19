<?php declare(strict_types=1);

namespace Navplan\Webcam\Persistence\Model;


class DbTableWebcam
{
    public const TABLE_NAME = "webcams";
    public const COL_ID = "id";
    public const COL_NAME = "name";
    public const COL_URL = "url";
    public const COL_LAT = "latitude";
    public const COL_LON = "longitude";
    public const COL_AD_ICAO = "airport_icao";
}
