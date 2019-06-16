<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Domain;

use NavplanTest\Traffic\Mocks\DummyOgnTraffic1;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic2;
use NavplanTest\Traffic\Mocks\DummyOgnTraffic3;
use PHPUnit\Framework\TestCase;


class TrafficOgnTest extends TestCase {
    public function test_create_instance() {
        $traffic1 = DummyOgnTraffic1::create();
        $traffic2 = DummyOgnTraffic2::create();
        $traffic3 = DummyOgnTraffic3::create();

        $this->assertNotNull($traffic1);
        $this->assertNotNull($traffic2);
        $this->assertNotNull($traffic3);
    }
}
