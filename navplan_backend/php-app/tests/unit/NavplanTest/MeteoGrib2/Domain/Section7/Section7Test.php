<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section7;

use NavplanTest\MeteoGrib2\Mocks\Section7\DummySection7_1;
use PHPUnit\Framework\TestCase;


class Section7Test extends TestCase {
    public function test_create_instance() {
        $section = DummySection7_1::create();

        $this->assertEquals([(53400.0 + 0b10110100101) / 10, (53400 + 0b10110100101) / 10], $section->getValues());
    }
}
