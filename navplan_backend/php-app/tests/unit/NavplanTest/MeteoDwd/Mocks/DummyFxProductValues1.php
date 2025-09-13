<?php declare(strict_types=1);

namespace NavplanTest\MeteoDwd\Mocks;

use Navplan\MeteoForecast\Domain\RunLengthFormat\RunLengthFormatValues;
use Navplan\MeteoForecast\RunLengthFormatParser\RunLengthFormat16BitValuesParser;


class DummyFxProductValues1 {
    public static function create(): RunLengthFormatValues {
        return new RunLengthFormatValues(
            RunLengthFormat16BitValuesParser::MIN_VALUE,
            RunLengthFormat16BitValuesParser::MAX_VALUE,
            array_fill(0, 10, 0xC0FE)
        );
    }


    public static function createData(): string {
        return pack('v*', ...array_fill(0, 10, 0xC0FE));
    }
}
