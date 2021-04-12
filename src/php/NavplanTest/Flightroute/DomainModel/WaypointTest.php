<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\DomainModel;

use NavplanTest\Flightroute\Mocks\DummyWaypoint1;
use NavplanTest\Flightroute\Mocks\DummyWaypoint2;
use NavplanTest\Flightroute\Mocks\DummyWaypoint3;
use PHPUnit\Framework\TestCase;


class WaypointTest extends TestCase {
    public function test__construct() {
        $wp1 = DummyWaypoint1::create();
        $wp2 = DummyWaypoint2::create();
        $wp3 = DummyWaypoint3::create();

        $this->assertNotNull($wp1);
        $this->assertNotNull($wp2);
        $this->assertNotNull($wp3);
    }
}
