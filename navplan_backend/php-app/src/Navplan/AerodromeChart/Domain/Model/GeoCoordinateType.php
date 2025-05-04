<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Model;


enum GeoCoordinateType: string {
    case LON_LAT = "LON_LAT";
    case LV03 = "LV03";
    case LV95 = "LV95";
}
