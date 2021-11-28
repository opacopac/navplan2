<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\RestModel;

use Navplan\Flightroute\RestModel\RestReadFlightrouteListResponseConverter;
use Navplan\Flightroute\UseCase\ReadFlightrouteList\RestReadFlightrouteListResponse;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\Flightroute\Mocks\DummyFlightroute2;
use PHPUnit\Framework\TestCase;


class RestFlightrouteListResponseTest extends TestCase {
    public function test_toArray() {
        $route1 = DummyFlightroute1::create();
        $route2 = DummyFlightroute2::create();
        $response = new RestReadFlightrouteListResponse([$route1, $route2]);
        $responseRest = RestReadFlightrouteListResponseConverter::toRest($response);

        $this->assertNotNull($responseRest["navplanList"]);
        $this->assertEquals(2, count($responseRest["navplanList"]));
    }
}
