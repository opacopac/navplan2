<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section3;

use NavplanTest\MeteoGrib2\Mocks\Section3\DummyGridDefinitionSource1;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyGridDefinitionTemplate20_1;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummyNumberOfPoints1;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummySection3_1;
use PHPUnit\Framework\TestCase;


class Section3Test extends TestCase {
    public function test_create_instance() {
        $section = DummySection3_1::create();

        $this->assertEquals(DummyGridDefinitionSource1::create(), $section->getSource());
        $this->assertEquals(25, $section->getDataPointCount());
        $this->assertEquals(DummyNumberOfPoints1::create(), $section->getNumberOfPoints());
        $this->assertEquals(DummyGridDefinitionTemplate20_1::create(), $section->getGridDefTemplate());
    }
}
