<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section1;

use Navplan\MeteoGrib2\Domain\Section1\DataType;


class DummyDataType1 {
    public static function create(): DataType {
        return new DataType(DataType::FORECAST_PRODUCTS);
    }


    public static function createValue(): int {
        return 1;
    }
}
