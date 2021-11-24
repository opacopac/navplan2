<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\RestModel;

use Navplan\Flightroute\RestModel\RestDeleteFlightrouteRequestConverter;
use PHPUnit\Framework\TestCase;


class RestDeleteFlightrouteRequestTest extends TestCase {
    public function test_fromArgs() {
        $token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdEBuYXZwbGFuLmNoIiwiaXNzIjoiTkFWUExBTi5DSCIsImV4cCI6MTU0MzEzODk5OCwic3ViIjoiIiwiYXVkIjoiIn0.YcMmyrdm-Mxd4au2EqKKb5vVgGy0S_J9wlDZzSkP6Z4";
        $routeId = 12345;
        $args = array("token" => $token, "id" => $routeId);
        $request = RestDeleteFlightrouteRequestConverter::fromArgs($args);

        $this->assertEquals($token, $request->token);
        $this->assertEquals($routeId, $request->flightrouteId);
    }
}
