<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section4;

use NavplanTest\MeteoGrib2\Mocks\Section4\DummyProductDefinitionTemplate0_1;
use NavplanTest\MeteoGrib2\Mocks\Section4\DummySection4_1;
use PHPUnit\Framework\TestCase;


class Section4Test extends TestCase {
    public function test_create_instance() {
        $section = DummySection4_1::create();

        $this->assertEquals(DummyProductDefinitionTemplate0_1::create(), $section->getProductDefinitionTemplate());
        $this->assertEquals([], $section->getCoordinateValues());
    }
}
