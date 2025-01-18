<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;


enum PerformanceTableTemperatureReference: string
{
    case OAT = "OAT";
    case ISA = "ISA";
}
