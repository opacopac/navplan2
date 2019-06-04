<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Domain;

// TODO => config
require_once __DIR__ . "/../../../config_test.php";

use Navplan\Flightroute\Domain\DeleteFlightrouteRequest;
use Navplan\User\UseCase\UserHelper;
use PHPUnit\Framework\TestCase;


class DeleteFlightrouteRequestTest extends TestCase {
    public function test__construct() {
        $routeId = 123;
        $token = UserHelper::createToken("test@navplan.ch", FALSE);
        $request = new DeleteFlightrouteRequest($routeId, $token);

        $this->assertNotNull($request);
        $this->assertEquals($routeId, $request->flightrouteId);
        $this->assertEquals($token, $request->token);
    }
}
