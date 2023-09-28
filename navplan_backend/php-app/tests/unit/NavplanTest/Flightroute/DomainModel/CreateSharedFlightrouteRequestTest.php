<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\DomainModel;

use Navplan\Flightroute\UseCase\CreateSharedFlightroute\CreateSharedFlightrouteRequest;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use PHPUnit\Framework\TestCase;


class CreateSharedFlightrouteRequestTest extends TestCase {
    public function test__construct() {
        $route = DummyFlightroute1::create();
        $request = new CreateSharedFlightrouteRequest($route);

        $this->assertNotNull($request);
        $this->assertEquals($route, $request->flightroute);
    }
}
