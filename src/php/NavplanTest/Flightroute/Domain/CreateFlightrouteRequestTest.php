<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\Domain;

use Navplan\Flightroute\Domain\CreateFlightrouteRequest;
use Navplan\User\UseCase\TokenService;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\MockNavplanConfig;
use PHPUnit\Framework\TestCase;


class CreateFlightrouteRequestTest extends TestCase {
    /* @var $config MockNavplanConfig */
    private $config;
    /* @var $tokenService TokenService */
    private $tokenService;


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
        $this->tokenService = $this->config->getTokenService();
    }


    public function test__construct() {
        $route = DummyFlightroute1::create();
        $token = $this->tokenService->createToken("test@navplan.ch", FALSE);
        $request = new CreateFlightrouteRequest($route, $token);

        $this->assertNotNull($request);
        $this->assertEquals($route, $request->flightroute);
        $this->assertEquals($token, $request->token);
    }
}
