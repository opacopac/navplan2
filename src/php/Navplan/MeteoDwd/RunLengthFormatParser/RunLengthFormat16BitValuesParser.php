<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RunLengthFormatParser;

use Navplan\MeteoDwd\Domain\RunLengthFormat\RunLengthFormatValues;


class RunLengthFormat16BitValuesParser {
    public const MIN_VALUE = 0;
    public const MAX_VALUE = 4095;
    public const NO_DATA_BITMASK = 0b00000000000001;
    public const NEGATIVE_BITMASK = 0b000000000000001;
    public const CLUTTER_BITMASK = 0b0000000000000001;


    public static function parse(string $data): RunLengthFormatValues {
        return new RunLengthFormatValues(
            self::MIN_VALUE,
            self::MAX_VALUE,
            array_values(unpack("v*a", $data))
        );
    }
}
