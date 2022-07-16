<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DomainModel;


enum AirportRunwayType: string {
    case ASPH = "ASPH";
    case CONC = "CONC";
    case GRASS = "GRASS";
    case SAND = "SAND";
    case WATER = "WATER";
    case GRAVEL = "GRAVEL";
    case EARTH = "EARTH";
    case ICE = "ICE";
    case SNOW = "SNOW";
    case UNKNOWN = "UNKNOWN";
}
