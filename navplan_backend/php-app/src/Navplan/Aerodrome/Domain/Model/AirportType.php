<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Model;


enum AirportType: string {
    case AF_MIL_CIVIL = "AF_MIL_CIVIL";
    case GLIDING = "GLIDING";
    case AF_CIVIL = "AF_CIVIL";
    case INTL_APT = "INTL_APT";
    case HELI_MIL = "HELI_MIL";
    case AD_MIL = "AD_MIL";
    case LIGHT_AIRCRAFT = "LIGHT_AIRCRAFT";
    case HELI_CIVIL = "HELI_CIVIL";
    case AD_CLOSED = "AD_CLOSED";
    case APT = "APT";
    case AF_WATER = "AF_WATER";
    case LDG_STRIP = "LDG_STRIP";
    case AGRI_STRIP = "AGRI_STRIP";
    case ALTIPORT = "ALTIPORT";
    case HELI_HOSPITAL = "HELI_HOSPITAL"; // own
    case HELI_MOUNTAIN = "HELI_MOUNTAIN"; // own
    case AF_MOUNTAIN = "AF_MOUNTAIN"; // own
}
