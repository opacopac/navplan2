<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;


enum TimeUnit: string {
    case S = "S";
    case MS = "MS";
    case M = "M";
    case H = "H";
}
