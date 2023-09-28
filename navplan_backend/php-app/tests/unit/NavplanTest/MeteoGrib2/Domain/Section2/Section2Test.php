<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section2;

use NavplanTest\MeteoGrib2\Mocks\Section2\DummySection2_1;
use PHPUnit\Framework\TestCase;


class Section2Test extends TestCase {
    public function test_create_instance() {
        $section = DummySection2_1::create();

        $this->assertNotNull($section);
    }
}
