<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Rest;

use Navplan\Flightroute\Rest\RestReadFlightrouteListRequest;
use PHPUnit\Framework\TestCase;


class RestReadFlightrouteListRequestTest extends TestCase {
    public function test_fromArgs() {
        $token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdEBuYXZwbGFuLmNoIiwiaXNzIjoiTkFWUExBTi5DSCIsImV4cCI6MTU0MzEzODk5OCwic3ViIjoiIiwiYXVkIjoiIn0.YcMmyrdm-Mxd4au2EqKKb5vVgGy0S_J9wlDZzSkP6Z4";
        $args = array("token" => $token);
        $request = RestReadFlightrouteListRequest::fromArgs($args);

        $this->assertNotNull($request);
        $this->assertEquals($token, $request->token);
    }
}
