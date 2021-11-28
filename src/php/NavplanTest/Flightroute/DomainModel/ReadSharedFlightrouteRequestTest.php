<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\DomainModel;

use Navplan\Flightroute\UseCase\ReadSharedFlightroute\RestReadSharedFlightrouteRequest;
use PHPUnit\Framework\TestCase;


class ReadSharedFlightrouteRequestTest extends TestCase {
    public function test__construct() {
        $shareId = "123abc";
        $request = new RestReadSharedFlightrouteRequest($shareId);

        $this->assertNotNull($request);
        $this->assertEquals($shareId, $request->shareId);
    }
}
