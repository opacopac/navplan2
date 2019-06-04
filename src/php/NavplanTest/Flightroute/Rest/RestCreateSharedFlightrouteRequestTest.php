<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Rest;

use Navplan\Flightroute\Rest\RestCreateSharedFlightrouteRequest;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use PHPUnit\Framework\TestCase;


class RestCreateSharedFlightrouteRequestTest extends TestCase {
    public function test_fromArgs() {
        $routeArgs = DummyFlightroute1::createRestArgs();
        $args = array("navplan" => $routeArgs);
        $request = RestCreateSharedFlightrouteRequest::fromArgs($args);

        $this->assertNotNull($request->flightroute);
    }
}
