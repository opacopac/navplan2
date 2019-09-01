<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section3;

use Navplan\MeteoGrib2\Domain\Section3\GridDefinitionTemplateType;


class DummyGridDefinitionTemplateType1 {
    public static function create(): GridDefinitionTemplateType {
        return new GridDefinitionTemplateType(GridDefinitionTemplateType::POLAR_STEREOGRAPHIC);
    }


    public static function createValue(): int {
        return 20;
    }
}
