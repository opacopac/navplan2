<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;


enum PerformanceTableTemperatureReference: string
{
    case OUTSIDE_TEMPERATURE = "OUTSIDE_TEMPERATURE";
    case ISA_TEMPERATURE = "ISA_TEMPERATURE";
}
