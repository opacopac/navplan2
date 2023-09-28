<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;


enum SpeedUnit: string {
    case KT = "KT";
    case KMH = "KMH";
    case MPS = "MPS";
}
