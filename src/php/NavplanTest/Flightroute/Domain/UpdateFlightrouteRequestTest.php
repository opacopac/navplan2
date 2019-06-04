<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Domain;

// TODO => config
require_once __DIR__ . "/../../../config_test.php";

use Navplan\Flightroute\Domain\UpdateFlightrouteRequest;
use Navplan\User\UseCase\UserHelper;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use PHPUnit\Framework\TestCase;


class UpdateFlightrouteRequestTest extends TestCase {
    public function test__construct() {
        $route = DummyFlightroute1::create();
        $token = UserHelper::createToken("test@navplan.ch", FALSE);
        $request = new UpdateFlightrouteRequest($route, $token);

        $this->assertNotNull($request);
        $this->assertEquals($route, $request->flightroute);
        $this->assertEquals($token, $request->token);
    }
}
