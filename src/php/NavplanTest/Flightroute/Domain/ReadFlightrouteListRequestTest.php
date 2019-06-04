<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Domain;

// TODO => config
require_once __DIR__ . "/../../../config_test.php";

use Navplan\Flightroute\Domain\ReadFlightrouteListRequest;
use Navplan\User\UseCase\UserHelper;
use PHPUnit\Framework\TestCase;


class ReadFlightrouteListRequestTest extends TestCase {
    public function test__construct() {
        $token = UserHelper::createToken("test@navplan.ch", FALSE);
        $request = new ReadFlightrouteListRequest($token);

        $this->assertNotNull($request);
        $this->assertEquals($token, $request->token);
    }
}
