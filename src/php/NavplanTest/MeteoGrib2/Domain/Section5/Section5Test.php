<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section5;

use NavplanTest\MeteoGrib2\Mocks\Section5\DummyDataRepresentationTemplate0_1;
use NavplanTest\MeteoGrib2\Mocks\Section5\DummySection5_1;
use PHPUnit\Framework\TestCase;


class Section5Test extends TestCase {
    public function test_create_instance() {
        $section = DummySection5_1::create();

        $this->assertEquals(DummyDataRepresentationTemplate0_1::create(), $section->getDataRepresentationTemplate());
        $this->assertEquals(25, $section->getDataPointCount());
    }
}
