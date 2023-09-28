<?php declare(strict_types=1);

namespace NavplanTest\Traffic\DomainModel;

use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficPosition1;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficPosition2;
use NavplanTest\Traffic\Mocks\DummyAdsbexTrafficPosition3;
use PHPUnit\Framework\TestCase;


class TrafficPositionTest extends TestCase {
    public function test_create_instance() {
        $pos1 = DummyAdsbexTrafficPosition1::create();
        $pos2 = DummyAdsbexTrafficPosition2::create();
        $pos3 = DummyAdsbexTrafficPosition3::create();

        $this->assertNotNull($pos1);
        $this->assertNotNull($pos2);
        $this->assertNotNull($pos3);
    }
}
