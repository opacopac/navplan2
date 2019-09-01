<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section3;

use Navplan\MeteoGrib2\Domain\Section3\GridDefinitionSource;
use Navplan\MeteoGrib2\Domain\Section3\GridDefinitionTemplateType;
use Navplan\MeteoGrib2\Domain\Section3\NumberOfPointsInterpretation;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyGridDefinitionTemplatePolarStereographic1;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummySection3_1;
use PHPUnit\Framework\TestCase;


class Section3Test extends TestCase {
    public function test_create_instance() {
        $section = DummySection3_1::create();

        $this->assertEquals(new GridDefinitionSource(GridDefinitionSource::TEMPLATE), $section->getSource());
        $this->assertEquals(25, $section->getNumDataPoints());
        $this->assertEquals(0, $section->getNumBytesNumberPointsList());
        $this->assertEquals(new NumberOfPointsInterpretation(NumberOfPointsInterpretation::NO_LIST), $section->getNumberPointsListInterpretation());
        $this->assertEquals(new GridDefinitionTemplateType(GridDefinitionTemplateType::POLAR_STEREOGRAPHIC), $section->getGridDefTemplateType());
        $this->assertEquals(DummyGridDefinitionTemplatePolarStereographic1::create(), $section->getGridDefTemplate());
    }
}
