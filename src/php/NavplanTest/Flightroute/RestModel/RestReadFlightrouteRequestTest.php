<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\RestModel;

use Navplan\Flightroute\RestModel\RestReadFlightrouteRequestConverter;
use PHPUnit\Framework\TestCase;


class RestReadFlightrouteRequestTest extends TestCase {
    public function test_fromArgs() {
        $routeId = 123456;
        $token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdEBuYXZwbGFuLmNoIiwiaXNzIjoiTkFWUExBTi5DSCIsImV4cCI6MTU0MzEzODk5OCwic3ViIjoiIiwiYXVkIjoiIn0.YcMmyrdm-Mxd4au2EqKKb5vVgGy0S_J9wlDZzSkP6Z4";
        $args = array("token" => $token, "id" => $routeId);
        $request = RestReadFlightrouteRequestConverter::fromArgs($args);

        $this->assertNotNull($request);
        $this->assertEquals($token, $request->token);
        $this->assertEquals($routeId, $request->flightrouteId);
    }
}
