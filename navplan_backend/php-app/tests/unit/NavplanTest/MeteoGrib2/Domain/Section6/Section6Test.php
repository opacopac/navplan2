<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section6;

use NavplanTest\MeteoGrib2\Mocks\Section6\DummySection6_1;
use PHPUnit\Framework\TestCase;


class Section6Test extends TestCase {
    public function test_create_instance() {
        $section = DummySection6_1::create();

        $this->assertEquals(255, $section->getBitMapIndicator());
        $this->assertEquals(NULL, $section->getBitMap());
    }
}
