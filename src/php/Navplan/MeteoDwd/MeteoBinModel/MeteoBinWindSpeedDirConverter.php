<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\MeteoBinModel;


class MeteoBinWindSpeedDirConverter {
    private const NONE_VALUE = 0xFF;


    public static function fromBinValueList(array $values): array {
        return array_map(
            function ($value) { return self::fromBinValue($value); },
            $values
        );
    }


    public static function fromBinValue(int $value): ?float {
        if ($value == self::NONE_VALUE) {
            return null;
        }

        return $value - 128;
    }
}
