<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;


enum PerformanceTableAltitudeReference: string
{
    case PRESSURE_ALTITUDE = "PRESSURE_ALTITUDE";
    case FIELD_ALTITUDE = "FIELD_ALTITUDE";
}
