<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\DomainModel;

use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\DummyFlightroute2;
use NavplanTest\Flightroute\Mocks\DummyFlightroute3;
use PHPUnit\Framework\TestCase;


class FlightrouteTest extends TestCase {
    public function test__construct() {
        $route1 = DummyFlightroute1::create();
        $route2 = DummyFlightroute2::create();
        $route3 = DummyFlightroute3::create();

        $this->assertNotNull($route1);
        $this->assertNotNull($route2);
        $this->assertNotNull($route3);
    }
}
