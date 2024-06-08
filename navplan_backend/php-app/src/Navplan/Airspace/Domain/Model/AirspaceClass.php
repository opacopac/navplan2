<?php declare(strict_types=1);

namespace Navplan\Airspace\Domain\Model;


enum AirspaceClass: string {
    case A = "A";
    case B = "B";
    case C = "C";
    case D = "D";
    case E = "E";
    case F = "F";
    case G = "G";
    case SUA = "SUA";
    case UNCLASSIFIED = "UNCLASSIFIED";
}
