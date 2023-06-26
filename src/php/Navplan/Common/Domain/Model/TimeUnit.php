<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;


enum TimeUnit: string {
    case S = "S";
    case MS = "MS";
    case M = "M";
    case H = "H";
}
