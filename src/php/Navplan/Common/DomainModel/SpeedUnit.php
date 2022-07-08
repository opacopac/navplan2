<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;


enum SpeedUnit: string {
    case KT = "KT";
    case KMH = "KMH";
    case MPS = "MPS";
}
