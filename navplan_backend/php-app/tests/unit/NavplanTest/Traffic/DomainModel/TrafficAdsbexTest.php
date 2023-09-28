<?php declare(strict_types=1);

namespace NavplanTest\Traffic\DomainModel;

use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTraffic3;
use PHPUnit\Framework\TestCase;


class TrafficAdsbexTest extends TestCase {
    public function test_create_instance() {
        $traffic1 = DummyAdsbexTraffic1::create();
        $traffic2 = DummyAdsbexTraffic2::create();
        $traffic3 = DummyAdsbexTraffic3::create();

        $this->assertNotNull($traffic1);
        $this->assertNotNull($traffic2);
        $this->assertNotNull($traffic3);
    }
}
