<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;


enum AltitudeUnit: string {
    case M = "M";
    case FT = "FT";
    case FL = "FL";
}
