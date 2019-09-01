<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section1;

use Navplan\MeteoGrib2\Domain\Section1\DataType;


class DataTypeParser {
    public static function parse(int $value): DataType {
        switch ($value) {
            case 0: return new DataType(DataType::ANALYSIS_PRODUCTS);
            case 1: return new DataType(DataType::FORECAST_PRODUCTS);
            case 2: return new DataType(DataType::ANALYSIS_AND_FORECAST_PRODUCTS);
            case 3: return new DataType(DataType::CONTROL_FORECAST_PRODUCTS);
            case 4: return new DataType(DataType::PERTURBED_FORECAST_PRODUCTS);
            case 5: return new DataType(DataType::CONTROL_AND_PERTURBED_FORECAST_PRODUCTS);
            case 6: return new DataType(DataType::PROCESSED_SATELLITE_OBSERVATIONS);
            case 7: return new DataType(DataType::PROCESSED_RADAR_OBSERVATIONS);
            case 255: return new DataType(DataType::MISSING);
            default: return new DataType(DataType::UNKNOWN);
        }
    }
}
