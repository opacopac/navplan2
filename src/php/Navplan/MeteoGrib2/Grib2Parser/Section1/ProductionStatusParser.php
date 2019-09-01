<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section1;

use Navplan\MeteoGrib2\Domain\Section1\ProductionStatus;


class ProductionStatusParser {
    public static function parse(int $value): ProductionStatus {
        switch ($value) {
            case 0: return new ProductionStatus(ProductionStatus::OPERATIONAL_PRODUCTS);
            case 1: return new ProductionStatus(ProductionStatus::OPERATIONAL_TEST_PRODUCTS);
            case 2: return new ProductionStatus(ProductionStatus::RESEARCH_PRODUCTS);
            case 3: return new ProductionStatus(ProductionStatus::REANALYSIS_PRODUCTS);
            case 255: return new ProductionStatus(ProductionStatus::MISSING);
            default: return new ProductionStatus(ProductionStatus::UNKNOWN);
        }
    }
}
