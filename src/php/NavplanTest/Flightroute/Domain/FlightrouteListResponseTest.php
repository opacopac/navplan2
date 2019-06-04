<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Domain;

use Navplan\Flightroute\Domain\FlightrouteListResponse;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\DummyFlightroute2;
use PHPUnit\Framework\TestCase;


class FlightrouteListResponseTest extends TestCase {
    public function test__construct() {
        $route1 = DummyFlightroute1::create();
        $route2 = DummyFlightroute2::create();
        $response = new FlightrouteListResponse([$route1, $route2]);

        $this->assertNotNull($response);
        $this->assertEquals($route1, $response->flightrouteList[0]);
        $this->assertEquals($route2, $response->flightrouteList[1]);
    }


    public function test__construct_empty_list() {
        $response = new FlightrouteListResponse([]);

        $this->assertNotNull($response);
        $this->assertEquals(0, count($response->flightrouteList));
    }

}
