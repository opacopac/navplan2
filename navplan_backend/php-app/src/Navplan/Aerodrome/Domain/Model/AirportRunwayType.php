<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Model;


enum AirportRunwayType: string {
    case ASPH = "ASPH";
    case CONC = "CONC";
    case GRASS = "GRAS";
    case SAND = "SAND";
    case WATER = "WATE";
    case GRAVEL = "GRVL";
    case EARTH = "SOIL";
    case ICE = "ICE";
    case SNOW = "SNOW";
    case UNKNOWN = "UNKN";
}
