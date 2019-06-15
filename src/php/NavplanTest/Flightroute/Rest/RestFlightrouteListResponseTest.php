<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Rest;

use Navplan\Flightroute\Domain\FlightrouteListResponse;
use Navplan\Flightroute\Rest\RestFlightrouteListResponse;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\DummyFlightroute2;
use PHPUnit\Framework\TestCase;


class RestFlightrouteListResponseTest extends TestCase {
    public function test_toArray() {
        $route1 = DummyFlightroute1::create();
        $route2 = DummyFlightroute2::create();
        $response = new FlightrouteListResponse([$route1, $route2]);
        $responseRest = RestFlightrouteListResponse::toRest($response);

        $this->assertNotNull($responseRest["navplanList"]);
        $this->assertEquals(2, count($responseRest["navplanList"]));
    }
}
