<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;


enum AircraftType: string
{
    case AMPHIBIAN = "A";
    case GYROCOPTER = "G";
    case HELICOPTER = "H";
    case LANDPLANE = "L";
    case SEAPLANE = "S";
    case TILTROTOR = "T";
    case SPECIAL = "X";
    case UNKNOWN = "U";
}
