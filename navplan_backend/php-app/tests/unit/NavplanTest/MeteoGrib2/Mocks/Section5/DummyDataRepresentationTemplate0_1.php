<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section5;

use Navplan\MeteoGrib2\Domain\Section5\DataRepresentationTemplate0;
use Navplan\MeteoGrib2\Domain\Section5\FieldType;


class DummyDataRepresentationTemplate0_1 {
    public static function create(): DataRepresentationTemplate0 {
        return new DataRepresentationTemplate0(
            53400.0,
            0,
            1,
            11,
            new FieldType(FieldType::FLOAT)
        );
    }


    public static function createData(): string {
        return pack("NnnCC",0b01000111010100001001100000000000, 0, 1, 11, 0);
    }
}
