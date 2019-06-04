<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Rest;

use Navplan\Flightroute\Domain\Flightroute;
use Navplan\Flightroute\Rest\RestFlightroute;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use PHPUnit\Framework\TestCase;


class RestFlightrouteTest extends TestCase
{
    private function assertEqualRestValues(array $routeRest, Flightroute $route) {
        $this->assertEquals($route->id, $routeRest["id"]);
        $this->assertEquals($route->title, $routeRest["title"]);
        $this->assertEquals($route->aircraftSpeedKt, $routeRest["aircraft_speed"]);
        $this->assertEquals($route->aircraftConsumptionLpH, $routeRest["aircraft_consumption"]);
        $this->assertEquals($route->extraFuelL, $routeRest["extra_fuel"]);
        $this->assertEquals($route->comments, $routeRest["comments"]);
        $this->assertEquals(count($route->waypoinList), count($routeRest["waypoints"]));
        $this->assertEquals($route->alternate ? 1 : 0, $routeRest["alternate"] ? 1 : 0);
    }


    public function test_fromArgs() {
        $routeRest = DummyFlightroute1::createRestArgs();
        $route = RestFlightroute::fromArgs($routeRest);

        $this->assertEqualRestValues($routeRest, $route);
    }


    public function test_toArray() {
        $route = DummyFlightroute1::create();
        $routeRest = RestFlightroute::toArray($route);

        $this->assertEqualRestValues($routeRest, $route);
    }
}
