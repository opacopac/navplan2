<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Domain;

// TODO => config
require_once __DIR__ . "/../../../config_test.php";

use Navplan\Flightroute\Domain\ReadFlightrouteRequest;
use Navplan\User\UseCase\UserHelper;
use PHPUnit\Framework\TestCase;


class ReadFlightrouteRequestTest extends TestCase {
    public function test__construct() {
        $routeId = 123;
        $token = UserHelper::createToken("test@navplan.ch", FALSE);
        $request = new ReadFlightrouteRequest($routeId, $token);

        $this->assertNotNull($request);
        $this->assertEquals($routeId, $request->flightrouteId);
        $this->assertEquals($token, $request->token);
    }
}
