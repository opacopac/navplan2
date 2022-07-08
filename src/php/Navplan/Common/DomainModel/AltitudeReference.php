<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;


enum AltitudeReference: string {
    case GND = "GND";
    case MSL = "MSL";
    case STD = "STD";
}
