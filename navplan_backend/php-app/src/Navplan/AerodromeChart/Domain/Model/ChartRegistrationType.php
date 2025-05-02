<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Model;


enum ChartRegistrationType: string {
    case POS1_POS2 = "POS1_POS2";
    case POS1_SCALE = "POS1_SCALE";
    case ARP_SCALE = "ARP_SCALE";
}
