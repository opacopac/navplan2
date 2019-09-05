<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section4;

use NavplanTest\MeteoGrib2\Mocks\Section4\DummyFixedSurface1;
use PHPUnit\Framework\TestCase;


class FixedSurfaceTest extends TestCase {
    public function test_create_instance() {
        $fixSurface = DummyFixedSurface1::create();

        $this->assertEquals(100, $fixSurface->getType());
        $this->assertEquals(500, $fixSurface->getValue());
    }
}
