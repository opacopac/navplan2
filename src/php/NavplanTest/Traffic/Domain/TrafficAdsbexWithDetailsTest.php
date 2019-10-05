<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Domain;

use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficWithDetails1;
use PHPUnit\Framework\TestCase;


class TrafficAdsbexWithDetailsTest extends TestCase {
    public function test_create_instance() {
        $traffic1 = DummyAdsbexTrafficWithDetails1::create();

        $this->assertNotNull($traffic1);
    }
}
