<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\DomainModel;

use Navplan\Flightroute\UseCase\RestFlightrouteResponse;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use PHPUnit\Framework\TestCase;


class FlightrouteResponseTest extends TestCase {
    public function test__construct() {
        $route = DummyFlightroute1::create();
        $response = new RestFlightrouteResponse($route);

        $this->assertNotNull($response);
        $this->assertEquals($route, $response->flightroute);
    }


    public function test__construct_empty_result() {
        $route = NULL;
        $response = new RestFlightrouteResponse($route);

        $this->assertNotNull($response);
        $this->assertEquals($route, $response->flightroute);
    }
}
