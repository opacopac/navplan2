<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section5;

use Navplan\MeteoGrib2\Domain\Section5\FieldType;


class FieldTypeParser {
    public static function parse(int $value): FieldType {
        switch ($value) {
            case 0: return new FieldType(FieldType::FLOAT);
            case 1: return new FieldType(FieldType::INTEGER);
            case 255: return new FieldType(FieldType::MISSING);
            default: return new FieldType(FieldType::UNKNOWN);
        }
    }
}
