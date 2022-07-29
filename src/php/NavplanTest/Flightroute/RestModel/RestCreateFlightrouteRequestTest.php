<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\RestModel;

use Navplan\Flightroute\Rest\Converter\RestCreateFlightrouteRequestConverter;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use PHPUnit\Framework\TestCase;


class RestCreateFlightrouteRequestTest extends TestCase {
    public function test_fromArgs() {
        $token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdEBuYXZwbGFuLmNoIiwiaXNzIjoiTkFWUExBTi5DSCIsImV4cCI6MTU0MzEzODk5OCwic3ViIjoiIiwiYXVkIjoiIn0.YcMmyrdm-Mxd4au2EqKKb5vVgGy0S_J9wlDZzSkP6Z4";
        $routeArgs = DummyFlightroute1::createRestArgs();
        $args = array("token" => $token, "navplan" => $routeArgs);
        $request = RestCreateFlightrouteRequestConverter::fromArgs($args);

        $this->assertEquals($token, $request->token);
        $this->assertNotNull($request->flightroute);
    }
}
