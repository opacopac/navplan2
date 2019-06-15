<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Rest;

use Navplan\Flightroute\Domain\FlightrouteResponse;
use Navplan\Flightroute\Rest\RestFlightrouteResponse;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use PHPUnit\Framework\TestCase;


class RestFlightrouteResponseTest extends TestCase {
    public function test_toArray() {
        $route1 = DummyFlightroute1::create();
        $response = new FlightrouteResponse($route1);
        $responseRest = RestFlightrouteResponse::toRest($response);

        $this->assertNotNull($responseRest["navplan"]);
    }
}
