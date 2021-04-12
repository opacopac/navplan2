<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\RestModel;

use Navplan\Flightroute\RestModel\CreateSharedFlightrouteRequestConverter;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use PHPUnit\Framework\TestCase;


class RestCreateSharedFlightrouteRequestTest extends TestCase {
    public function test_fromArgs() {
        $routeArgs = DummyFlightroute1::createRestArgs();
        $args = array("navplan" => $routeArgs);
        $request = CreateSharedFlightrouteRequestConverter::fromArgs($args);

        $this->assertNotNull($request->flightroute);
    }
}
