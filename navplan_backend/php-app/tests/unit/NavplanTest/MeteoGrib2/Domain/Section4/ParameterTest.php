<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Domain\Section4;

use NavplanTest\MeteoGrib2\Mocks\Section4\DummyParameter1;
use PHPUnit\Framework\TestCase;


class ParameterTest extends TestCase {
    public function test_create_instance() {
        $param = DummyParameter1::create();

        $this->assertEquals(3, $param->getCategory());
        $this->assertEquals(5, $param->getNumber());
    }
}
