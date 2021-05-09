<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section1;

use Navplan\Common\Enum;


class DataType extends Enum {
    const UNKNOWN = 0;
    const ANALYSIS_PRODUCTS = 1;
    const FORECAST_PRODUCTS = 2;
    const ANALYSIS_AND_FORECAST_PRODUCTS = 3;
    const CONTROL_FORECAST_PRODUCTS = 4;
    const PERTURBED_FORECAST_PRODUCTS = 5;
    const CONTROL_AND_PERTURBED_FORECAST_PRODUCTS = 6;
    const PROCESSED_SATELLITE_OBSERVATIONS = 7;
    const PROCESSED_RADAR_OBSERVATIONS = 8;
    const MISSING = 999;

    const __default = self::UNKNOWN;
}
