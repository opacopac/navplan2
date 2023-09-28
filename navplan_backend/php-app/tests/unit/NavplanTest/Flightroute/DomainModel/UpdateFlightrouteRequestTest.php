<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\DomainModel;

use Navplan\Flightroute\UseCase\UpdateFlightroute\RestUpdateFlightrouteRequest;
use Navplan\User\Domain\Service\TokenService;
use NavplanTest\Flightroute\Mocks\DummyFlightroute1;
use NavplanTest\MockNavplanDiContainer;
use PHPUnit\Framework\TestCase;


class UpdateFlightrouteRequestTest extends TestCase {
    private MockNavplanDiContainer $config;
    private TokenService $tokenService;


    protected function setUp(): void {
        $this->config = new MockNavplanDiContainer();
        $this->tokenService = $this->config->getTokenService();
    }


    public function test__construct() {
        $route = DummyFlightroute1::create();
        $token = $this->tokenService->createToken("test@navplan.ch", FALSE);
        $request = new RestUpdateFlightrouteRequest($route, $token);

        $this->assertNotNull($request);
        $this->assertEquals($route, $request->flightroute);
        $this->assertEquals($token, $request->token);
    }
}
