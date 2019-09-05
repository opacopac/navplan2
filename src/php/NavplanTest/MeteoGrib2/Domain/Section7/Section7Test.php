<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section7;

use NavplanTest\MeteoGrib2\Mocks\Section7\DummySection7_1;
use PHPUnit\Framework\TestCase;


class Section7Test extends TestCase {
    public function test_create_instance() {
        $section = DummySection7_1::create();

        $this->assertEquals(["A", "B", "C", "D", "E"], $section->getValues());
    }
}
