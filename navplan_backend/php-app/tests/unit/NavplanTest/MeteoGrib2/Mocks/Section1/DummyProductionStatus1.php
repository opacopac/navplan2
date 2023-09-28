<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section1;

use Navplan\MeteoGrib2\Domain\Section1\ProductionStatus;


class DummyProductionStatus1 {
    public static function create(): ProductionStatus {
        return new ProductionStatus(ProductionStatus::OPERATIONAL_PRODUCTS);
    }


    public static function createValue(): int {
        return 0;
    }
}
