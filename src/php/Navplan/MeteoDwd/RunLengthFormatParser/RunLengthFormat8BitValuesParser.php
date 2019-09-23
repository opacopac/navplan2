<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RunLengthFormatParser;

use Navplan\MeteoDwd\Domain\RunLengthFormat\RunLengthFormatValues;


class RunLengthFormat8BitValuesParser {
    public const MIN_VALUE = 0;
    public const MAX_VALUE = 255;


    public static function parse(string $data): RunLengthFormatValues {
        return new RunLengthFormatValues(
            self::MIN_VALUE,
            self::MAX_VALUE,
            array_values(unpack("C*a", $data))
        );
    }
}
