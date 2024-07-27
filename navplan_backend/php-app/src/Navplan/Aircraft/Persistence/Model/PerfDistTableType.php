<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Model;


enum PerfDistTableType: string {
    case TKOFF_ROLL = "TKOFF_ROLL";
    case TKOFF_50FT = "TKOFF_50FT";
    case LANDING_ROLL = "LANDING_ROLL";
    case LANDING_50FT = "LANDING_50FT";
}
