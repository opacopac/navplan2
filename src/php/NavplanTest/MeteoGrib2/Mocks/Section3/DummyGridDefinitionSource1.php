<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section3;

use Navplan\MeteoGrib2\Domain\Section3\GridDefinitionSource;


class DummyGridDefinitionSource1 {
    public static function create(): GridDefinitionSource {
        return new GridDefinitionSource(GridDefinitionSource::TEMPLATE);
    }


    public static function createValue(): int {
        return 0;
    }
}
