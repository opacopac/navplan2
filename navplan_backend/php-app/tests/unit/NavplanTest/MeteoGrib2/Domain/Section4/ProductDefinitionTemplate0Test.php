<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section4;

use DateInterval;
use NavplanTest\MeteoGrib2\Mocks\Section4\DummyFixedSurface1;
use NavplanTest\MeteoGrib2\Mocks\Section4\DummyFixedSurface2;
use NavplanTest\MeteoGrib2\Mocks\Section4\DummyForecastTime;
use NavplanTest\MeteoGrib2\Mocks\Section4\DummyGeneratingProcess1;
use NavplanTest\MeteoGrib2\Mocks\Section4\DummyParameter1;
use NavplanTest\MeteoGrib2\Mocks\Section4\DummyProductDefinitionTemplate0_1;
use PHPUnit\Framework\TestCase;


class ProductDefinitionTemplate0Test extends TestCase {
    public function test_create_instance() {
        $template = DummyProductDefinitionTemplate0_1::create();

        $this->assertEquals(0, $template->getTemplateNumber());
        $this->assertEquals(DummyParameter1::create(), $template->getParameter());
        $this->assertEquals(DummyGeneratingProcess1::create(), $template->getGeneratingProcess());
        $this->assertEquals(new DateInterval("PT3H30M"), $template->getCutOffTime());
        $this->assertEquals(DummyForecastTime::create(), $template->getForecastTime());
        $this->assertEquals(DummyFixedSurface1::create(), $template->getFixedSurface1());
        $this->assertEquals(DummyFixedSurface2::create(), $template->getFixedSurface2());
    }
}
