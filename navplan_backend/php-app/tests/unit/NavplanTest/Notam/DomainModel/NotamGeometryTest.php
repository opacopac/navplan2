<?php declare(strict_types=1);

namespace NavplanTest\Notam\DomainModel;

use NavplanTest\Notam\Mocks\DummyNotamGeometry1;
use NavplanTest\Notam\Mocks\DummyNotamGeometry2;
use PHPUnit\Framework\TestCase;


class NotamGeometryTest extends TestCase {
    public function test__construct() {
        $instance = DummyNotamGeometry1::create();
        $this->assertNotNull($instance);

        $instance2 = DummyNotamGeometry2::create();
        $this->assertNotNull($instance2);
    }
}
