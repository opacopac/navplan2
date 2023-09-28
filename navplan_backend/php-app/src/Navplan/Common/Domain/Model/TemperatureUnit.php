<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;


enum TemperatureUnit: string {
    case K = "K";
    case C = "C";
    case F = "F";
}
