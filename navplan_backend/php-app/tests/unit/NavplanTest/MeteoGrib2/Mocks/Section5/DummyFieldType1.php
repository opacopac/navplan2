<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section5;

use Navplan\MeteoGrib2\Domain\Section5\FieldType;


class DummyFieldType1 {
    public static function create(): FieldType {
        return new FieldType(FieldType::FLOAT);
    }


    public static function createValue(): int {
        return 0;
    }
}
